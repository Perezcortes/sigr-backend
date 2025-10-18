import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNumber, IsDateString, IsPhoneNumber, IsBoolean } from 'class-validator';

export class DatosEmpresaDto {
  @ApiProperty({ description: 'Nombre de la empresa o razón social' })
  @IsString()
  nombreEmpresa: string;

  @ApiProperty({ description: 'Correo electrónico' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: 'Dominio de internet' })
  @IsOptional()
  @IsString()
  dominio?: string;

  @ApiProperty({ description: 'RFC' })
  @IsString()
  rfc: string;

  @ApiProperty({ description: 'Teléfono' })
  @IsPhoneNumber('MX')
  telefono: string;

  @ApiPropertyOptional({ description: 'Ingreso mensual promedio' })
  @IsOptional()
  @IsNumber()
  ingresoMensual?: number;
}

export class ActaConstitutivaDto {
  @ApiProperty({ description: 'Nombre(s) del notario' })
  @IsString()
  notarioNombres: string;

  @ApiProperty({ description: 'Apellido paterno del notario' })
  @IsString()
  notarioApellidoPaterno: string;

  @ApiProperty({ description: 'Apellido materno del notario' })
  @IsString()
  notarioApellidoMaterno: string;

  @ApiProperty({ description: 'Número de escritura' })
  @IsString()
  numeroEscritura: string;

  @ApiProperty({ description: 'Fecha de constitución (YYYY-MM-DD)' })
  @IsDateString()
  fechaConstitucion: string;

  @ApiProperty({ description: 'Número de notaría' })
  @IsString()
  notarioNumero: string;

  @ApiProperty({ description: 'Ciudad de registro' })
  @IsString()
  ciudadRegistro: string;

  @ApiProperty({ description: 'Estado de registro' })
  @IsString()
  estadoRegistro: string;

  @ApiProperty({ description: 'Número de registro' })
  @IsString()
  numeroRegistro: string;

  @ApiProperty({ description: 'Giro comercial' })
  @IsString()
  giroComercial: string;
}

export class RepresentanteLegalDto {
  @ApiProperty({ description: 'Nombre(s)' })
  @IsString()
  nombres: string;

  @ApiProperty({ description: 'Apellido paterno' })
  @IsString()
  apellidoPaterno: string;

  @ApiProperty({ description: 'Apellido materno' })
  @IsString()
  apellidoMaterno: string;

  @ApiProperty({ enum: ['masculino', 'femenino'], description: 'Sexo' })
  @IsString()
  sexo: string;

  @ApiPropertyOptional({ description: 'Teléfono' })
  @IsOptional()
  @IsPhoneNumber('MX')
  telefono?: string;

  @ApiPropertyOptional({ description: 'Extensión' })
  @IsOptional()
  @IsString()
  extension?: string;

  @ApiProperty({ description: 'Correo electrónico' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '¿Facultades en acta constitutiva?' })
  @IsBoolean()
  facultadesEnActa: boolean;

  @ApiPropertyOptional({ description: 'Escritura pública o acta número' })
  @IsOptional()
  @IsString()
  escrituraNumero?: string;

  @ApiPropertyOptional({ description: 'Número de notaría' })
  @IsOptional()
  @IsString()
  notarioNumero?: string;

  @ApiPropertyOptional({ description: 'Fecha de escritura (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  fechaEscritura?: string;

  @ApiPropertyOptional({ description: 'Número de inscripción' })
  @IsOptional()
  @IsString()
  numeroInscripcion?: string;

  @ApiPropertyOptional({ description: 'Ciudad de registro' })
  @IsOptional()
  @IsString()
  ciudadRegistro?: string;

  @ApiPropertyOptional({ description: 'Estado de registro' })
  @IsOptional()
  @IsString()
  estadoRegistro?: string;

  @ApiPropertyOptional({ description: 'Tipo de representación' })
  @IsOptional()
  @IsString()
  tipoRepresentacion?: string;

  @ApiPropertyOptional({ description: 'Especifique tipo de representación' })
  @IsOptional()
  @IsString()
  tipoRepresentacionEspecifique?: string;
}