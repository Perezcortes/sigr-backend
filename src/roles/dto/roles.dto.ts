import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Nombre único del rol',
    example: 'gerente',
  })
  @IsString({ message: 'El nombre del rol debe ser una cadena de texto.' })
  @MinLength(2, { message: 'El nombre del rol debe tener al menos 2 caracteres.' })
  nombre: string;

  @ApiProperty({
    description: 'Descripción del rol',
    example: 'Gerente de oficina con permisos de gestión local.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  descripcion?: string;
  
  @ApiProperty({
    description: 'IDs de los permisos a asignar al rol.',
    example: [1, 2, 3],
    required: false
  })
  @IsOptional()
  @IsArray({ message: 'Los permisos deben ser un arreglo de números.' })
  @IsNumber({}, { each: true, message: 'Cada permiso debe ser un número.' })
  permissions?: number[];
}

export class UpdateRoleDto {
  @ApiProperty({
    description: 'Nombre del rol (opcional)',
    example: 'gerente_senior',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre del rol debe ser una cadena de texto.' })
  @MinLength(2, { message: 'El nombre del rol debe tener al menos 2 caracteres.' })
  nombre?: string;

  @ApiProperty({
    description: 'Descripción del rol (opcional)',
    example: 'Gerente de oficina con permisos de gestión avanzada.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  descripcion?: string;
  
  @ApiProperty({
    description: 'IDs de los permisos a asignar al rol. Reemplaza los permisos existentes.',
    example: [1, 2, 4],
    required: false
  })
  @IsOptional()
  @IsArray({ message: 'Los permisos deben ser un arreglo de números.' })
  @IsNumber({}, { each: true, message: 'Cada permiso debe ser un número.' })
  permissions?: number[];
}
