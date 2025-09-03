import { Injectable, UnauthorizedException, BadRequestException, ConflictException, NotFoundException, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { ConfigType } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { User } from "../users/entities/user.entity";
import { RefreshToken } from "./entities/refresh-token.entity";
import { Role } from "../roles/entities/role.entity";
import { Office } from "../offices/entities/office.entity";
import jwtConfig from "../config/jwt.config";

import { LoginDto, RegisterDto, RefreshTokenDto, ChangePasswordDto, LoginResponseDto, RefreshResponseDto } from "./dto/auth.dto";

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  office_id?: string;
  permissions: string[];
  iat?: number;
  exp?: number;
}

export interface DeviceInfo {
  ip?: string;
  userAgent?: string;
  device?: any;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Autenticar usuario con email y contraseña
   */
  async login(loginDto: LoginDto, deviceInfo?: DeviceInfo): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Buscar usuario con relaciones - usando query builder para más control
    const user = await this.userRepository.createQueryBuilder("user").leftJoinAndSelect("user.role", "role").leftJoinAndSelect("role.permissions", "permissions").leftJoinAndSelect("user.office", "office").where("user.email = :email", { email }).getOne();

    // ALTERNATIVA: Si se prefiere usar findOne, asegúrate de que las relaciones estén bien configuradas
    // const user = await this.userRepository.findOne({
    //   where: { email },
    //   relations: {
    //     role: {
    //       permissions: true
    //     },
    //     office: true
    //   },
    // });

    if (!user) {
      await this.incrementFailedAttempts(email);
      throw new UnauthorizedException("Credenciales inválidas");
    }

    // DEBUG: Agregar logs temporales para identificar el problema
    console.log("User found:", {
      id: user.id,
      email: user.email,
      role: user.role?.name,
      roleId: user.role?.id,
      permissionsCount: user.role?.permissions?.length || 0,
      permissions: user.role?.permissions?.map((p) => ({ id: p.id, name: p.name })),
    });

    // Verificar si el usuario está bloqueado
    if (user.isLocked()) {
      throw new UnauthorizedException(`Usuario bloqueado hasta ${user.locked_until?.toLocaleString()}`);
    }

    // Verificar si el usuario está activo
    if (!user.is_active) {
      throw new UnauthorizedException("Usuario inactivo");
    }

    // Validar contraseña
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      await this.incrementFailedAttempts(user.id);
      throw new UnauthorizedException("Credenciales inválidas");
    }

    // Resetear intentos fallidos y actualizar último login
    await this.resetFailedAttempts(user.id);
    await this.updateLastLogin(user.id);

    // Generar tokens
    const tokens = await this.generateTokens(user, deviceInfo);

    // Extraer permisos correctamente
    const permissions = user.role?.permissions?.map((p) => p.name) || [];

    // DEBUG: Log final de permisos
    console.log("Final permissions:", permissions);

    // Formatear respuesta según el frontend
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.full_name,
      role: user.role.name.toLowerCase() as any,
      oficina: user.office?.name,
      permissions: permissions,
      isActive: user.is_active,
    };

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      user: userResponse,
      expires_in: 86400, // 24 horas en segundos
      token_type: "Bearer",
    };
  }

  /**
   * Registrar nuevo usuario
   */
  async register(registerDto: RegisterDto, createdBy?: string): Promise<{ user: any; message: string }> {
    const { email, password, role_id, office_id, ...userData } = registerDto;

    // Verificar si el email ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException("El email ya está registrado");
    }

    // Verificar que el rol existe
    const role = await this.roleRepository.findOne({
      where: { id: role_id, is_active: true },
    });

    if (!role) {
      throw new BadRequestException("Rol no válido");
    }

    // Verificar que la oficina existe (si se proporciona)
    let office: Office | null = null;
    if (office_id) {
      office = await this.officeRepository.findOne({
        where: { id: office_id, is_active: true },
      });

      if (!office) {
        throw new BadRequestException("Oficina no válida");
      }
    }

    // Crear usuario
    const user = this.userRepository.create({
      ...userData,
      email,
      password_hash: password, // Se hashea automáticamente en el entity
      role_id,
      office_id,
      created_by: createdBy,
      is_verified: false,
    });

    const savedUser = await this.userRepository.save(user);

    // Cargar relaciones para la respuesta
    const userWithRelations = await this.userRepository.findOne({
      where: { id: savedUser.id },
      relations: ["role", "role.permissions", "office"],
    });

    return {
      user: userWithRelations?.toPublic(),
      message: "Usuario registrado exitosamente",
    };
  }

  /**
   * Refrescar token de acceso
   */
  async refreshToken(refreshDto: RefreshTokenDto, deviceInfo?: DeviceInfo): Promise<RefreshResponseDto> {
    const { refresh_token } = refreshDto;

    // PROBLEMA: Buscar el refresh token en la base de datos SIN filtro por token
    // INCORRECTO:
    // const refreshTokenRecord = await this.refreshTokenRepository.findOne({
    //   where: { is_revoked: false }, // Falta filtrar por token_hash
    //   relations: ['user', 'user.role', 'user.role.permissions', 'user.office'],
    // });

    // CORRECTO:
    const refreshTokenRecord = await this.refreshTokenRepository.findOne({
      where: {
        token_hash: refresh_token, // Buscar por el token específico
        is_revoked: false,
      },
      relations: ["user", "user.role", "user.role.permissions", "user.office"],
    });

    if (!refreshTokenRecord) {
      throw new UnauthorizedException("Token de refresco inválido");
    }

    // Validar el token
    const isValidToken = await refreshTokenRecord.validateToken(refresh_token);
    if (!isValidToken || !refreshTokenRecord.isValid()) {
      // Revocar token si está comprometido
      await this.revokeRefreshToken(refreshTokenRecord.id);
      throw new UnauthorizedException("Token de refresco inválido o expirado");
    }

    // Actualizar último uso
    refreshTokenRecord.last_used_at = new Date();
    await this.refreshTokenRepository.save(refreshTokenRecord);

    // Generar nuevos tokens
    const tokens = await this.generateTokens(refreshTokenRecord.user, deviceInfo);

    // Revocar el token anterior
    await this.revokeRefreshToken(refreshTokenRecord.id);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      expires_in: 86400,
      token_type: "Bearer",
    };
  }

  /**
   * Cambiar contraseña del usuario
   */
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const { current_password, new_password } = changePasswordDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    // Verificar contraseña actual
    const isCurrentPasswordValid = await user.validatePassword(current_password);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException("Contraseña actual incorrecta");
    }

    // Actualizar contraseña
    user.password_hash = new_password; // Se hashea automáticamente en el entity
    await this.userRepository.save(user);

    // Revocar todos los refresh tokens del usuario
    await this.revokeAllUserTokens(userId);

    return {
      message: "Contraseña actualizada exitosamente",
    };
  }

  /**
   * Cerrar sesión (revocar tokens)
   */
  async logout(userId: string): Promise<{ message: string }> {
    await this.revokeAllUserTokens(userId);
    return {
      message: "Sesión cerrada exitosamente",
    };
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["role", "role.permissions", "office"],
    });

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    return user.toPublic();
  }

  /**
   * Validar usuario por JWT payload
   */
  async validateUser(payload: JwtPayload): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub, is_active: true },
      relations: ["role", "role.permissions", "office"],
    });

    return user || null;
  }

  // Métodos privados de utilidad
  private async generateTokens(user: User, deviceInfo?: DeviceInfo): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
      office_id: user.office_id,
      permissions: user.role.permissions?.map((p) => p.name) || [],
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.jwtConfiguration.expiresIn,
    });

    // Generar refresh token único
    const refreshTokenValue = uuidv4();
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7); // 7 días

    // Guardar refresh token en la base de datos
    const refreshToken = this.refreshTokenRepository.create({
      user_id: user.id,
      token_hash: refreshTokenValue,
      expires_at: refreshTokenExpiry,
      ip_address: deviceInfo?.ip,
      user_agent: deviceInfo?.userAgent,
      device_info: deviceInfo?.device,
    });

    await this.refreshTokenRepository.save(refreshToken);

    return {
      accessToken,
      refreshToken: refreshTokenValue,
    };
  }

  private async incrementFailedAttempts(userIdOrEmail: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: [{ id: userIdOrEmail }, { email: userIdOrEmail }],
    });

    if (user) {
      user.failed_login_attempts += 1;

      // Bloquear usuario después de 5 intentos fallidos
      if (user.failed_login_attempts >= 5) {
        const lockUntil = new Date();
        lockUntil.setMinutes(lockUntil.getMinutes() + 15); // 15 minutos
        user.locked_until = lockUntil;
      }

      await this.userRepository.save(user);
    }
  }

  private async resetFailedAttempts(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      failed_login_attempts: 0,
      locked_until: undefined,
    });
  }

  private async updateLastLogin(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      last_login_at: new Date(),
    });
  }

  private async revokeRefreshToken(tokenId: string): Promise<void> {
    await this.refreshTokenRepository.update(tokenId, {
      is_revoked: true,
      revoked_at: new Date(),
    });
  }

  private async revokeAllUserTokens(userId: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { user_id: userId, is_revoked: false },
      {
        is_revoked: true,
        revoked_at: new Date(),
      },
    );
  }
}
