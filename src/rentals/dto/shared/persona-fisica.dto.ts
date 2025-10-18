import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, IsPhoneNumber } from 'class-validator';

export enum Nacionalidad {
  MEXICANA = 'mexicana',
  EXTRANJERA = 'extranjera'
}

export enum Sexo {
  MASCULINO = 'masculino',
  FEMENINO = 'femenino'
}

export enum EstadoCivil {
  SOLTERO = 'soltero',
  CASADO = 'casado',
  DIVORCIADO = 'divorciado',
  UNION_LIBRE = 'union_libre'
}

export enum TipoIdentificacion {
  INE = 'ine',
  PASAPORTE = 'pasaporte',
  CEDULA = 'cedula',
  LICENCIA = 'licencia',
  OTRO = 'otro'
}

export class DatosPersonalesDto {
  @ApiProperty({ description: 'Nombre(s)' })
  @IsString()
  nombres: string;

  @ApiProperty({ description: 'Apellido paterno' })
  @IsString()
  apellidoPaterno: string;

  @ApiProperty({ description: 'Apellido materno' })
  @IsString()
  apellidoMaterno: string;

  @ApiProperty({ enum: Nacionalidad, description: 'Nacionalidad' })
  @IsEnum(Nacionalidad)
  nacionalidad: Nacionalidad;

  @ApiPropertyOptional({ description: 'Especifique nacionalidad si es otra' })
  @IsOptional()
  @IsString()
  nacionalidadEspecifique?: string;

  @ApiProperty({ enum: Sexo, description: 'Sexo' })
  @IsEnum(Sexo)
  sexo: Sexo;

  @ApiProperty({ enum: EstadoCivil, description: 'Estado civil' })
  @IsEnum(EstadoCivil)
  estadoCivil: EstadoCivil;

  @ApiProperty({ description: 'Correo electrónico' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Confirmar correo electrónico' })
  @IsEmail()
  confirmarEmail: string;

  @ApiProperty({ enum: TipoIdentificacion, description: 'Tipo de identificación' })
  @IsEnum(TipoIdentificacion)
  identificacion: TipoIdentificacion;

  @ApiProperty({ description: 'Fecha de nacimiento (YYYY-MM-DD)' })
  @IsDateString()
  fechaNacimiento: string;

  @ApiPropertyOptional({ description: 'RFC' })
  @IsOptional()
  @IsString()
  rfc?: string;

  @ApiPropertyOptional({ description: 'CURP' })
  @IsOptional()
  @IsString()
  curp?: string;

  @ApiProperty({ description: 'Teléfono celular' })
  @IsPhoneNumber('MX')
  telefonoCelular: string;

  @ApiPropertyOptional({ description: 'Teléfono fijo' })
  @IsOptional()
  @IsPhoneNumber('MX')
  telefonoFijo?: string;
}

export class ConyugeDto {
  @ApiPropertyOptional({ description: 'Nombre(s) del cónyuge' })
  @IsOptional()
  @IsString()
  nombres?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del cónyuge' })
  @IsOptional()
  @IsString()
  apellidoPaterno?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del cónyuge' })
  @IsOptional()
  @IsString()
  apellidoMaterno?: string;

  @ApiPropertyOptional({ description: 'Teléfono del cónyuge' })
  @IsOptional()
  @IsPhoneNumber('MX')
  telefono?: string;
}