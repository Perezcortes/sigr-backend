import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsEmail,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateOfficeDto {
  @ApiProperty({ description: 'Nombre de la oficina', example: 'Oficina Central' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
  nombre: string;

  @ApiProperty({ description: 'Teléfono de la oficina', example: '9531234567', required: false })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  telefono?: string;

  @ApiProperty({ description: 'Correo de la oficina', example: 'contacto@sigr.com', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'Debe proporcionar un email válido.' })
  correo?: string;

  @ApiProperty({ description: 'Nombre del responsable', example: 'Juan Pérez' })
  @IsString({ message: 'El responsable debe ser una cadena de texto.' })
  responsable: string;

  @ApiProperty({ description: 'Clave única de la oficina', example: 'OAX001' })
  @IsString({ message: 'La clave debe ser una cadena de texto.' })
  clave: string;

  @ApiProperty({ description: 'Estado de actividad de la oficina', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'El estado de actividad debe ser un booleano.' })
  estatus_actividad?: boolean;

  @ApiProperty({ description: 'Estado para recibir leads', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'El estado para recibir leads debe ser un booleano.' })
  estatus_recibir_leads?: boolean;

  @ApiProperty({ description: 'Calle de la oficina', example: 'Av. Benito Juárez' })
  @IsString({ message: 'La calle debe ser una cadena de texto.' })
  calle: string;

  @ApiProperty({ description: 'Número exterior', example: '123' })
  @IsString({ message: 'El número exterior debe ser una cadena de texto.' })
  numero_exterior: string;

  @ApiProperty({ description: 'Número interior', example: 'Local A', required: false })
  @IsOptional()
  @IsString({ message: 'El número interior debe ser una cadena de texto.' })
  numero_interior?: string;

  @ApiProperty({ description: 'Colonia', example: 'Centro' })
  @IsString({ message: 'La colonia debe ser una cadena de texto.' })
  colonia: string;

  @ApiProperty({ description: 'Delegación o Municipio', example: 'Oaxaca de Juárez' })
  @IsString({ message: 'La delegación debe ser una cadena de texto.' })
  delegacion_municipio: string;

  @ApiProperty({ description: 'ID de la ciudad', example: 1 })
  @IsNumber({}, { message: 'El ID de la ciudad debe ser un número.' })
  ciudad: number;

  @ApiProperty({ description: 'ID del estado', example: 1 })
  @IsNumber({}, { message: 'El ID del estado debe ser un número.' })
  estate_id: number;

  @ApiProperty({ description: 'Código postal', example: '68000' })
  @IsString({ message: 'El código postal debe ser una cadena de texto.' })
  codigo_postal: string;

  @ApiProperty({ description: 'Latitud', example: 17.0654 })
  @IsNumber({}, { message: 'La latitud debe ser un número.' })
  @IsLatitude({ message: 'Debe proporcionar una latitud válida.' })
  lat: number;

  @ApiProperty({ description: 'Longitud', example: -96.7236 })
  @IsNumber({}, { message: 'La longitud debe ser un número.' })
  @IsLongitude({ message: 'Debe proporcionar una longitud válida.' })
  lng: number;
}

export class UpdateOfficeDto {
  @ApiProperty({ description: 'Nombre de la oficina', example: 'Oficina Central', required: false })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
  nombre?: string;

  @ApiProperty({ description: 'Teléfono de la oficina', example: '9531234567', required: false })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  telefono?: string;

  @ApiProperty({ description: 'Correo de la oficina', example: 'contacto@sigr.com', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'Debe proporcionar un email válido.' })
  correo?: string;

  @ApiProperty({ description: 'Nombre del responsable', example: 'Juan Pérez', required: false })
  @IsOptional()
  @IsString({ message: 'El responsable debe ser una cadena de texto.' })
  responsable?: string;

  @ApiProperty({ description: 'Clave única de la oficina', example: 'OAX001', required: false })
  @IsOptional()
  @IsString({ message: 'La clave debe ser una cadena de texto.' })
  clave?: string;

  @ApiProperty({ description: 'Estado de actividad de la oficina', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'El estado de actividad debe ser un booleano.' })
  estatus_actividad?: boolean;

  @ApiProperty({ description: 'Estado para recibir leads', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'El estado para recibir leads debe ser un booleano.' })
  estatus_recibir_leads?: boolean;

  @ApiProperty({ description: 'Calle de la oficina', example: 'Av. Benito Juárez', required: false })
  @IsOptional()
  @IsString({ message: 'La calle debe ser una cadena de texto.' })
  calle?: string;

  @ApiProperty({ description: 'Número exterior', example: '123', required: false })
  @IsOptional()
  @IsString({ message: 'El número exterior debe ser una cadena de texto.' })
  numero_exterior?: string;

  @ApiProperty({ description: 'Número interior', example: 'Local A', required: false })
  @IsOptional()
  @IsString({ message: 'El número interior debe ser una cadena de texto.' })
  numero_interior?: string;

  @ApiProperty({ description: 'Colonia', example: 'Centro', required: false })
  @IsOptional()
  @IsString({ message: 'La colonia debe ser una cadena de texto.' })
  colonia?: string;

  @ApiProperty({ description: 'Delegación o Municipio', example: 'Oaxaca de Juárez', required: false })
  @IsOptional()
  @IsString({ message: 'La delegación debe ser una cadena de texto.' })
  delegacion_municipio?: string;

  @ApiProperty({ description: 'ID de la ciudad', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El ID de la ciudad debe ser un número.' })
  ciudad?: number;

  @ApiProperty({ description: 'ID del estado', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El ID del estado debe ser un número.' })
  estate_id?: number;

  @ApiProperty({ description: 'Código postal', example: '68000', required: false })
  @IsOptional()
  @IsString({ message: 'El código postal debe ser una cadena de texto.' })
  codigo_postal?: string;

  @ApiProperty({ description: 'Latitud', example: 17.0654, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'La latitud debe ser un número.' })
  @IsLatitude({ message: 'Debe proporcionar una latitud válida.' })
  lat?: number;

  @ApiProperty({ description: 'Longitud', example: -96.7236, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'La longitud debe ser un número.' })
  @IsLongitude({ message: 'Debe proporcionar una longitud válida.' })
  lng?: number;
}
