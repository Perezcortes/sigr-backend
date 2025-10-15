import { Injectable, UnauthorizedException, BadRequestException, ConflictException, NotFoundException, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm";
import type { ConfigType } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { User } from "../users/entities/user.entity";
import { RefreshToken } from "./entities/refresh-token.entity";
import { Role } from "../roles/entities/role.entity";
import { Office } from "../offices/entities/office.entity";
import { PasswordResetToken } from "./entities/password-reset-token.entity";

import jwtConfig from "../config/jwt.config";

import { LoginDto, RegisterDto, RefreshTokenDto, ChangePasswordDto, LoginResponseDto, RefreshResponseDto, ForgotPasswordDto, ResetPasswordDto, UpdateProfileDto } from "./dto/auth.dto";

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  office_id?: number;
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
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {} /**
   * Autenticar usuario con email y contraseña
   */

  async login(loginDto: LoginDto, deviceInfo?: DeviceInfo): Promise<LoginResponseDto> {
    const { email, password } = loginDto; // Buscar usuario usando 'correo' y cargar relaciones

    const user = await this.userRepository.findOne({
      where: { correo: email },
      relations: ["role", "role.permissions", "offices"],
    });

    if (!user) {
      await this.incrementFailedAttempts(email);
      throw new UnauthorizedException("Credenciales inválidas");
    } // Verificar si el usuario está bloqueado

    if (user.isLocked()) {
      throw new UnauthorizedException(`Usuario bloqueado hasta ${user.locked_until?.toLocaleString()}`);
    } // Verificar si el usuario está activo

    if (!user.is_active) {
      throw new UnauthorizedException("Usuario inactivo");
    } // Validar contraseña

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      await this.incrementFailedAttempts(user.id.toString());
      throw new UnauthorizedException("Credenciales inválidas");
    } // Resetear intentos fallidos y actualizar último login

    await this.resetFailedAttempts(user.id.toString());
    await this.updateLastLogin(user.id.toString()); // Generar tokens

    const tokens = await this.generateTokens(user, deviceInfo); // Extraer permisos correctamente

    const permissions = user.role?.permissions?.map((p) => p.name) || []; // Formatear respuesta usando los getters de la entidad

    const userResponse = {
      id: user.id.toString(),
      email: user.email,
      name: user.full_name,
      role: user.role.nombre.toLowerCase(), // Usar 'nombre' no 'name'
      oficina: user.office?.nombre, // Usar 'nombre' no 'name'
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
  } /**
   * Registrar nuevo usuario
   */

  async register(registerDto: RegisterDto, createdBy?: string): Promise<{ user: any; message: string }> {
    const { email, password, first_name, last_name, role_id, office_id, phone } = registerDto; // Verificar si el email ya existe usando 'correo'

    const existingUser = await this.userRepository.findOne({
      where: { correo: email },
    });

    if (existingUser) {
      throw new ConflictException("El email ya está registrado");
    } // Verificar que el rol existe

    const role = await this.roleRepository.findOne({
      where: { id: Number(role_id), is_active: true },
    });

    if (!role) {
      throw new BadRequestException("Rol no válido");
    } // Verificar que la oficina existe (si se proporciona)

    let office: Office | null = null;
    if (office_id) {
      office = await this.officeRepository.findOne({
        where: { id: Number(office_id), estatus_actividad: true },
      });

      if (!office) {
        throw new BadRequestException("Oficina no válida");
      }
    } // Crear usuario - solución al error de tipos

    const userData: DeepPartial<User> = {
      nombres: first_name,
      primer_apellido: last_name.split(" ")[0] || last_name,
      segundo_apellido: last_name.split(" ")[1] || null,
      correo: email,
      telefono: phone || null,
      password: password,
      role_id: Number(role_id),
      is_active: true,
    };

    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user); // Asignar oficina si existe

    if (office) {
      // Necesitamos usar query builder o actualizar la relación
      await this.userRepository.createQueryBuilder().relation(User, "offices").of(savedUser.id).add(office.id);
    } // Cargar relaciones para la respuesta

    const userWithRelations = await this.userRepository.findOne({
      where: { id: savedUser.id },
      relations: ["role", "role.permissions", "offices"],
    });

    if (!userWithRelations) {
      throw new NotFoundException("Usuario no encontrado después de crearlo");
    }

    return {
      user: userWithRelations.toPublic(),
      message: "Usuario registrado exitosamente",
    };
  }

  /**
   * Actualizar nombre y email del perfil del usuario.
   */
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const { name, email } = updateProfileDto;

    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    // 1. Actualizar Email (correo)
    if (email && email !== user.correo) {
      // Verificar conflicto: ¿ya existe otro usuario con este email?
      const existingUser = await this.userRepository.findOne({ where: { correo: email } });
      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException("El nuevo email ya está en uso por otro usuario.");
      }
      user.correo = email;
    }

    // 2. Actualizar Nombre Completo
    if (name) {
      const nameParts = name.trim().split(/\s+/).filter(Boolean);

      // Asumiendo que el primer elemento es el/los nombre/s, el segundo el primer apellido, etc.
      user.nombres = nameParts[0] || user.nombres;
      user.primer_apellido = nameParts[1] || "";
      user.segundo_apellido = nameParts[2] || null;

      // Si el nombre tiene más de 3 partes, dejamos la lógica más compleja
      if (nameParts.length > 3) {
        // Podrías ajustar esta lógica según cómo maneje tu base de datos nombres compuestos
        user.nombres = nameParts.slice(0, nameParts.length - 2).join(" "); // Nombres compuestos
        user.primer_apellido = nameParts[nameParts.length - 2];
        user.segundo_apellido = nameParts[nameParts.length - 1];
      } else if (nameParts.length === 2) {
        // Si solo hay dos partes (ej. 'Juan Pérez'), la primera es nombre y la segunda es el primer apellido
        user.nombres = nameParts[0];
        user.primer_apellido = nameParts[1];
        user.segundo_apellido = null;
      }
    }

    // Guardar todos los cambios
    await this.userRepository.save(user);

    // Devolver el perfil completo actualizado con las relaciones cargadas
    const updatedUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ["role", "role.permissions", "offices"],
    });

    if (!updatedUser) {
      throw new NotFoundException("Usuario no encontrado después de actualizar.");
    }

    return updatedUser.toPublic();
  } /**
   * Refrescar token de acceso
   */

  async refreshToken(refreshDto: RefreshTokenDto, deviceInfo?: DeviceInfo): Promise<RefreshResponseDto> {
    const { refresh_token } = refreshDto; // Buscar el refresh token en la base de datos

    const refreshTokenRecord = await this.refreshTokenRepository.findOne({
      where: {
        token_hash: refresh_token,
        is_revoked: false,
      },
      relations: ["user", "user.role", "user.role.permissions", "user.offices"],
    });

    if (!refreshTokenRecord) {
      throw new UnauthorizedException("Token de refresco inválido");
    } // Validar el token

    const isValidToken = await refreshTokenRecord.validateToken(refresh_token);
    if (!isValidToken || !refreshTokenRecord.isValid()) {
      // Revocar token si está comprometido
      await this.revokeRefreshToken(refreshTokenRecord.id);
      throw new UnauthorizedException("Token de refresco inválido o expirado");
    } // Actualizar último uso

    refreshTokenRecord.last_used_at = new Date();
    await this.refreshTokenRepository.save(refreshTokenRecord); // Generar nuevos tokens

    const tokens = await this.generateTokens(refreshTokenRecord.user, deviceInfo); // Revocar el token anterior

    await this.revokeRefreshToken(refreshTokenRecord.id);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      expires_in: 86400,
      token_type: "Bearer",
    };
  } /**
   * Cambiar contraseña del usuario
   */

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const { current_password, new_password } = changePasswordDto;

    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    } // Verificar contraseña actual

    const isCurrentPasswordValid = await user.validatePassword(current_password);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException("Contraseña actual incorrecta");
    } // Actualizar contraseña

    user.password = new_password; // Se hashea automáticamente en el entity
    await this.userRepository.save(user); // Revocar todos los refresh tokens del usuario

    await this.revokeAllUserTokens(Number(userId));

    return {
      message: "Contraseña actualizada exitosamente",
    };
  } /**
   * Cerrar sesión (revocar tokens)
   */

  async logout(userId: string): Promise<{ message: string }> {
    await this.revokeAllUserTokens(Number(userId));
    return {
      message: "Sesión cerrada exitosamente",
    };
  } /**
   * Obtener perfil del usuario autenticado
   */

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
      relations: ["role", "role.permissions", "offices"],
    });

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    return user.toPublic();
  } /**
   * Validar usuario por JWT payload
   */

  async validateUser(payload: JwtPayload): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: Number(payload.sub), is_active: true },
      relations: ["role", "role.permissions", "offices"],
    });

    return user || null;
  } /**
   * Lógica para el olvido de contraseña.
   * Genera un token y lo guarda en la base de datos.
   */

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string; token?: string }> {
    const { email } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ where: { correo: email } });
    const genericMessage = "Si tu correo está en nuestro sistema, te hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada y spam."; // No revelamos si el usuario existe o no, por razones de seguridad
    if (!user) {
      return { message: genericMessage };
    } // Invalidar tokens anteriores para este usuario
    await this.passwordResetTokenRepository.update({ user_id: user.id, is_used: false }, { is_used: true }); // Generar un token seguro (UUID) y su hash para guardar en la base de datos

    const tokenValue = uuidv4();
    const tokenHash = await bcrypt.hash(tokenValue, 12);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30); // 30 minutos de expiración
    const passwordResetToken = this.passwordResetTokenRepository.create({
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: expiresAt,
    });
    await this.passwordResetTokenRepository.save(passwordResetToken); // En un entorno real, aquí se enviaría el correo.
    // Para pruebas, devolvemos el token sin hashear.
    return { message: genericMessage, token: tokenValue };
  } /**
   * Lógica para restablecer la contraseña.
   * Valida el token y actualiza la contraseña del usuario.
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { token, new_password } = resetPasswordDto; // Busca todos los tokens no usados.
    const allUnusedTokens = await this.passwordResetTokenRepository.find({
      where: { is_used: false },
      relations: ["user"],
    });
    let foundTokenRecord: PasswordResetToken | null = null; // Itera sobre los tokens para encontrar una coincidencia con el hash
    for (const tokenRecord of allUnusedTokens) {
      const isMatch = await bcrypt.compare(token, tokenRecord.token_hash);
      if (isMatch) {
        foundTokenRecord = tokenRecord;
        break;
      }
    }

    if (!foundTokenRecord || foundTokenRecord.expires_at < new Date()) {
      throw new BadRequestException("Token inválido o expirado.");
    } // Actualizar la contraseña del usuario
    const user = foundTokenRecord.user;
    user.password = new_password;
    await this.userRepository.save(user); // Invalidar el token después de un uso exitoso
    foundTokenRecord.is_used = true;
    await this.passwordResetTokenRepository.save(foundTokenRecord);
    return { message: "Contraseña restablecida exitosamente." };
  } // Métodos privados de utilidad

  private async generateTokens(user: User, deviceInfo?: DeviceInfo): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      sub: user.id.toString(),
      email: user.email,
      role: user.role.nombre, // Usar 'nombre'
      office_id: user.office_id,
      permissions: user.role.permissions?.map((p) => p.name) || [],
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.jwtConfiguration.expiresIn,
    }); // Generar refresh token único

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
    // La consulta debe manejar id O correo, no ambos a la vez
    let user: User | null;
    if (!isNaN(Number(userIdOrEmail))) {
      user = await this.userRepository.findOne({ where: { id: Number(userIdOrEmail) } });
    } else {
      user = await this.userRepository.findOne({ where: { correo: userIdOrEmail } });
    }

    if (user) {
      user.failed_login_attempts += 1; // Bloquear usuario después de 5 intentos fallidos

      if (user.failed_login_attempts >= 5) {
        const lockUntil = new Date();
        lockUntil.setMinutes(lockUntil.getMinutes() + 15); // 15 minutos
        user.locked_until = lockUntil;
      }

      await this.userRepository.save(user);
    }
  }

  private async resetFailedAttempts(userId: string): Promise<void> {
    await this.userRepository.update(Number(userId), {
      failed_login_attempts: 0,
      locked_until: null,
    });
  }

  private async updateLastLogin(userId: string): Promise<void> {
    await this.userRepository.update(Number(userId), {
      last_login_at: new Date(),
    });
  }

  private async revokeRefreshToken(tokenId: string): Promise<void> {
    await this.refreshTokenRepository.update(tokenId, {
      is_revoked: true,
      revoked_at: new Date(),
    });
  }

  private async revokeAllUserTokens(userId: number): Promise<void> {
    await this.refreshTokenRepository.update(
      { user_id: userId, is_revoked: false },
      {
        is_revoked: true,
        revoked_at: new Date(),
      },
    );
  }
}
