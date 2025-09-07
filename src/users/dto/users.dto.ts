import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsNumber,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class OfficeDto {
  @ApiProperty({ description: 'ID de la oficina', example: 1 })
  @IsNumber()
  id: number;
}

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre(s) del usuario', example: 'Juan' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombres: string;

  @ApiProperty({ description: 'Primer apellido del usuario', example: 'Pérez' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @MinLength(2, { message: 'El primer apellido debe tener al menos 2 caracteres' })
  primer_apellido: string;

  @ApiProperty({
    description: 'Segundo apellido del usuario (opcional)',
    example: 'García',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
  segundo_apellido?: string;

  @ApiProperty({ description: 'Email del usuario', example: 'juan.perez@rentas.com' })
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  correo: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
    minLength: 6,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ description: 'ID del rol del usuario', example: 2 })
  @IsNumber({}, { message: 'El role_id debe ser un número' })
  role_id: number;
  
  @ApiProperty({
    description: 'Teléfono del usuario (opcional)',
    example: '9511234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  telefono?: string;

  @ApiProperty({
    description: 'Número de WhatsApp del usuario (opcional)',
    example: '9511234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El número de WhatsApp debe ser una cadena de texto' })
  whatsapp?: string;

  @ApiProperty({
    description: 'ID de la oficina principal del usuario (opcional)',
    example: [ { id: 1 } ],
    required: false,
    type: [OfficeDto]
  })
  @IsOptional()
  @IsArray({ message: 'Las oficinas deben ser un array de objetos' })
  @ArrayMinSize(0, { message: 'Debe proporcionar al menos una oficina' })
  @ArrayMaxSize(1, { message: 'Solo se puede asignar a una oficina principal' })
  @Type(() => OfficeDto)
  offices?: OfficeDto[];
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nombre(s) del usuario (opcional)',
    example: 'Juan',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombres?: string;

  @ApiProperty({
    description: 'Primer apellido del usuario (opcional)',
    example: 'Pérez',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @MinLength(2, { message: 'El primer apellido debe tener al menos 2 caracteres' })
  primer_apellido?: string;

  @ApiProperty({
    description: 'Segundo apellido del usuario (opcional)',
    example: 'García',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
  segundo_apellido?: string;

  @ApiProperty({
    description: 'Email del usuario (opcional)',
    example: 'juan.perez@rentas.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  correo?: string;

  @ApiProperty({
    description: 'Contraseña del usuario (opcional)',
    example: 'newpassword123',
    minLength: 6,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @ApiProperty({ description: 'ID del rol del usuario (opcional)', example: 2, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El role_id debe ser un número' })
  role_id?: number;

  @ApiProperty({
    description: 'Teléfono del usuario (opcional)',
    example: '9511234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  telefono?: string;

  @ApiProperty({
    description: 'Número de WhatsApp del usuario (opcional)',
    example: '9511234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El número de WhatsApp debe ser una cadena de texto' })
  whatsapp?: string;
  
  @ApiProperty({
    description: 'ID de la oficina principal del usuario (opcional)',
    example: [ { id: 1 } ],
    required: false,
    type: [OfficeDto]
  })
  @IsOptional()
  @IsArray({ message: 'Las oficinas deben ser un array de objetos' })
  @ArrayMinSize(0, { message: 'Debe proporcionar al menos una oficina' })
  @ArrayMaxSize(1, { message: 'Solo se puede asignar a una oficina principal' })
  @Type(() => OfficeDto)
  offices?: OfficeDto[];
}
