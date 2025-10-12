import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Ip,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard, Permissions } from './guards/auth.guards';
import {
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  ChangePasswordDto,
  LoginResponseDto,
  RefreshResponseDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from './dto/auth.dto';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
    roleId: string;
    officeId?: string;
    permissions: string[];
  };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Autenticar usuario con email y contraseña',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Credenciales inválidas' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  async login(
    @Body() loginDto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<LoginResponseDto> {
    const deviceInfo = {
      ip,
      userAgent,
      device: null, // Aquí podrías parsear más información del user-agent
    };

    return this.authService.login(loginDto, deviceInfo);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  @Permissions('users.create')
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description: 'Crear una nueva cuenta de usuario (requiere permisos)',
  })
  @ApiBearerAuth()
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            role: { type: 'string' },
            oficina: { type: 'string' },
            permissions: { type: 'array', items: { type: 'string' } },
            isActive: { type: 'boolean' },
          },
        },
        message: { type: 'string', example: 'Usuario registrado exitosamente' },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'El email ya está registrado',
  })
  async register(
    @Body() registerDto: RegisterDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.authService.register(registerDto, req.user.userId);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Renovar token de acceso',
    description: 'Generar un nuevo token de acceso usando el refresh token',
  })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Token renovado exitosamente',
    type: RefreshResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Token de refresco inválido',
  })
  async refreshToken(
    @Body() refreshDto: RefreshTokenDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<RefreshResponseDto> {
    const deviceInfo = {
      ip,
      userAgent,
      device: null,
    };

    return this.authService.refreshToken(refreshDto, deviceInfo);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Cambiar contraseña',
    description: 'Cambiar la contraseña del usuario autenticado',
  })
  @ApiBearerAuth()
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Contraseña cambiada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Contraseña actualizada exitosamente',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Contraseña actual incorrecta',
  })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.authService.changePassword(req.user.userId, changePasswordDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Cerrar sesión',
    description: 'Cerrar sesión y revocar todos los tokens del usuario',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Sesión cerrada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Sesión cerrada exitosamente',
        },
      },
    },
  })
  async logout(@Request() req: AuthenticatedRequest) {
    return this.authService.logout(req.user.userId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Obtener perfil del usuario',
    description: 'Obtener información del usuario autenticado',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string' },
        oficina: { type: 'string' },
        permissions: { type: 'array', items: { type: 'string' } },
        isActive: { type: 'boolean' },
        created_at: { type: 'string', format: 'date-time' },
        last_login_at: { type: 'string', format: 'date-time' },
      },
    },
  })
  async getProfile(@Request() req: AuthenticatedRequest) {
    return this.authService.getProfile(req.user.userId);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Actualizar perfil del usuario',
    description: 'Actualizar campos editables (nombre, email) del usuario autenticado.',
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Perfil actualizado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string' },
        oficina: { type: 'string' },
        permissions: { type: 'array', items: { type: 'string' } },
        isActive: { type: 'boolean' },
        created_at: { type: 'string', format: 'date-time' },
        last_login_at: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validación o email ya en uso.',
  })
  async updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    // Llama al servicio para actualizar el perfil
    return this.authService.updateProfile(req.user.userId, updateProfileDto);
  }

  @Get('verify-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Verificar token',
    description: 'Verificar que el token JWT es válido',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Token válido',
    schema: {
      type: 'object',
      properties: {
        valid: { type: 'boolean', example: true },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
            permissions: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido',
  })
  async verifyToken(@Request() req: AuthenticatedRequest) {
    return {
      valid: true,
      user: {
        id: req.user.userId,
        email: req.user.email,
        role: req.user.role,
        permissions: req.user.permissions,
      },
    };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Solicitud de recuperación de contraseña',
    description: 'Envía un token de recuperación a la dirección de correo electrónico del usuario.',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Mensaje de confirmación de envío (genérico por seguridad).',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Si tu correo está en nuestro sistema, te hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada y spam.' },
        token: { type: 'string', example: 'a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c', nullable: true },
      },
    },
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string; token?: string }> {
    const response = await this.authService.forgotPassword(forgotPasswordDto);
    return response;
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Restablecer contraseña',
    description: 'Verifica el token de recuperación y actualiza la contraseña del usuario.',
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Contraseña restablecida exitosamente.',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Contraseña restablecida exitosamente.',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Token inválido o expirado.',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
