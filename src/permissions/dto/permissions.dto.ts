import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Nombre único del permiso',
    example: 'crear_propiedades',
  })
  @IsString({ message: 'El nombre del permiso debe ser una cadena de texto.' })
  @MinLength(2, { message: 'El nombre del permiso debe tener al menos 2 caracteres.' })
  nombre: string;

  @ApiProperty({
    description: 'Descripción del permiso',
    example: 'Permite a los usuarios crear nuevas propiedades.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  descripcion?: string;
}

export class UpdatePermissionDto {
  @ApiProperty({
    description: 'Nombre único del permiso',
    example: 'crear_propiedades',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre del permiso debe ser una cadena de texto.' })
  @MinLength(2, { message: 'El nombre del permiso debe tener al menos 2 caracteres.' })
  nombre?: string;

  @ApiProperty({
    description: 'Descripción del permiso',
    example: 'Permite a los usuarios crear nuevas propiedades.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  descripcion?: string;
}
