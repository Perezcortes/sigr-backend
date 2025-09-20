import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean, IsEmail, IsNotEmpty, IsObject, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

// Enum para el tipo de persona
const TIPO_PERSONA = ['fisica', 'moral'] as const;

class CreatePersonDto {
  @ApiProperty({ description: 'Tipo de persona', example: 'fisica', enum: TIPO_PERSONA })
  @IsIn(TIPO_PERSONA)
  tipo_persona: 'fisica' | 'moral';

  // Campos para persona física
  @ApiProperty({ description: 'Nombre completo', example: 'Ana Patricia Hernández Morales', required: false })
  @IsOptional()
  @IsString()
  nombre_completo?: string;
  
  @ApiProperty({ description: 'Teléfono', example: '9511234567', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;
  
  @ApiProperty({ description: 'Correo electrónico', example: 'ana.p@mail.com', required: false })
  @IsOptional()
  @IsEmail()
  correo?: string;

  // Campos para persona moral
  @ApiProperty({ description: 'Razón social', example: 'Inversiones XYZ SA de CV', required: false })
  @IsOptional()
  @IsString()
  razon_social?: string;
  
  @ApiProperty({ description: 'Nombre comercial', example: 'Inversiones XYZ', required: false })
  @IsOptional()
  @IsString()
  nombre_comercial?: string;
  
  @ApiProperty({ description: 'Representante legal', example: 'Gerardo Ortiz', required: false })
  @IsOptional()
  @IsString()
  representante_legal?: string;
}

class CreatePropertyDto {
  @ApiProperty({ description: 'Tipo de propiedad', example: 'casa' })
  @IsString()
  tipo: string;

  @ApiProperty({ description: 'Código postal', example: '68000' })
  @IsString()
  codigo_postal: string;
  
  @ApiProperty({ description: 'ID del estado', example: 1 })
  @IsNumber()
  estado_id: number;
  
  @ApiProperty({ description: 'ID de la ciudad', example: 2 })
  @IsNumber()
  ciudad_id: number;
  
  @ApiProperty({ description: 'Colonia', example: 'Centro' })
  @IsString()
  colonia: string;
  
  @ApiProperty({ description: 'Calle', example: 'Av. Hidalgo' })
  @IsString()
  calle: string;
  
  @ApiProperty({ description: 'Número exterior', example: '100' })
  @IsString()
  numero: string;
  
  @ApiProperty({ description: 'Número interior', example: 'A', required: false })
  @IsOptional()
  @IsString()
  interior?: string;
  
  @ApiProperty({ description: 'Referencia', example: 'Frente al parque', required: false })
  @IsOptional()
  @IsString()
  referencia?: string;
  
  @ApiProperty({ description: 'Metros cuadrados', example: 120.5 })
  @IsNumber()
  metros_cuadrados: number;
  
  @ApiProperty({ description: 'Monto de la renta', example: 15000.00 })
  @IsNumber()
  monto_renta: number;
}

export class CreateRentalDto {
  @ApiProperty({ description: 'Tipo de origen de la renta', example: 'manual' })
  @IsString()
  @IsNotEmpty()
  tipo_origen: string;

  @ApiProperty({ description: 'ID del usuario que crea la renta', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  creado_por_user_id: number;

  @ApiProperty({ description: 'Datos del inquilino' })
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  inquilino: CreatePersonDto;

  @ApiProperty({ description: 'Datos del propietario' })
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  propietario: CreatePersonDto;

  @ApiProperty({ description: 'Datos de la propiedad (solo si se crea manualmente)' })
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePropertyDto)
  propiedad: CreatePropertyDto;

  @ApiProperty({ description: 'Datos del obligado solidario (opcional)', required: false })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  obligado_solidario?: CreatePersonDto;
}
