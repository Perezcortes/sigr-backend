import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsUUID } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'admin@rentas.com',
  })
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'admin123',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'nuevo@rentas.com',
  })
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Nombre(s) del usuario',
    example: 'Juan',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  first_name: string;

  @ApiProperty({
    description: 'Apellidos del usuario',
    example: 'Pérez García',
  })
  @IsString({ message: 'Los apellidos deben ser una cadena de texto' })
  @MinLength(2, { message: 'Los apellidos deben tener al menos 2 caracteres' })
  last_name: string;

  @ApiProperty({
    description: 'ID del rol del usuario',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID(4, { message: 'Debe proporcionar un ID de rol válido' })
  role_id: string;

  @ApiProperty({
    description: 'ID de la oficina del usuario',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Debe proporcionar un ID de oficina válido' })
  office_id?: string;

  @ApiProperty({
    description: 'Teléfono del usuario',
    example: '+52 55 1234 5678',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  phone?: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Token de refresco',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString({ message: 'El token de refresco debe ser una cadena de texto' })
  refresh_token: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Contraseña actual',
    example: 'password123',
  })
  @IsString({ message: 'La contraseña actual debe ser una cadena de texto' })
  current_password: string;

  @ApiProperty({
    description: 'Nueva contraseña',
    example: 'newpassword123',
  })
  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
  new_password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@rentas.com',
  })
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token de recuperación',
    example: 'abc123def456',
  })
  @IsString({ message: 'El token debe ser una cadena de texto' })
  token: string;

  @ApiProperty({
    description: 'Nueva contraseña',
    example: 'newpassword123',
  })
  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
  new_password: string;
}

// Respuestas de la API
export class LoginResponseDto {
  @ApiProperty({
    description: 'Token de acceso JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Token de refresco',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refresh_token: string;

  @ApiProperty({
    description: 'Información del usuario',
  })
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    oficina?: string;
    permissions: string[];
    isActive: boolean;
  };

  @ApiProperty({
    description: 'Tiempo de expiración del token en segundos',
    example: 86400,
  })
  expires_in: number;

  @ApiProperty({
    description: 'Tipo de token',
    example: 'Bearer',
  })
  token_type: string;
}

export class RefreshResponseDto {
  @ApiProperty({
    description: 'Nuevo token de acceso JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Nuevo token de refresco',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refresh_token: string;

  @ApiProperty({
    description: 'Tiempo de expiración del token en segundos',
    example: 86400,
  })
  expires_in: number;

  @ApiProperty({
    description: 'Tipo de token',
    example: 'Bearer',
  })
  token_type: string;
}