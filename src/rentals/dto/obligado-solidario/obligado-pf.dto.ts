import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsEnum, ValidateNested, IsBoolean, IsDateString } from 'class-validator';
import { DatosPersonalesDto, ConyugeDto, DomicilioDto, EmpleoDto } from '../shared';

export class PropiedadGarantiaDto {
  @ApiPropertyOptional({ type: DomicilioDto, description: 'Domicilio de la propiedad en garantía' })
  @IsOptional()
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilio?: DomicilioDto;

  @ApiPropertyOptional({ description: 'Número de escritura' })
  @IsOptional()
  @IsString()
  numeroEscritura?: string;

  @ApiPropertyOptional({ description: 'Fecha de escritura (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  fechaEscritura?: string;

  @ApiPropertyOptional({ description: 'Nombre(s) del notario' })
  @IsOptional()
  @IsString()
  notarioNombres?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del notario' })
  @IsOptional()
  @IsString()
  notarioApellidoPaterno?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del notario' })
  @IsOptional()
  @IsString()
  notarioApellidoMaterno?: string;

  @ApiPropertyOptional({ description: 'Número de notaría' })
  @IsOptional()
  @IsString()
  notarioNumero?: string;

  @ApiPropertyOptional({ description: 'Lugar de notaría' })
  @IsOptional()
  @IsString()
  notarioLugar?: string;

  @ApiPropertyOptional({ description: 'Registro público de la propiedad' })
  @IsOptional()
  @IsString()
  registroPublico?: string;

  @ApiPropertyOptional({ description: 'Folio real electrónico' })
  @IsOptional()
  @IsString()
  folioReal?: string;

  @ApiPropertyOptional({ description: 'Fecha de registro (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  fechaRegistro?: string;

  @ApiPropertyOptional({ description: 'Número de boleta predial' })
  @IsOptional()
  @IsString()
  boletaPredial?: string;
}

export class ObligadoPfDto {
  @ApiProperty({ type: DatosPersonalesDto, description: 'Datos personales' })
  @ValidateNested()
  @Type(() => DatosPersonalesDto)
  datosPersonales: DatosPersonalesDto;

  @ApiPropertyOptional({ type: ConyugeDto, description: 'Datos del cónyuge' })
  @IsOptional()
  @ValidateNested()
  @Type(() => ConyugeDto)
  conyuge?: ConyugeDto;

  @ApiProperty({ type: DomicilioDto, description: 'Domicilio actual' })
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilioActual: DomicilioDto;

  @ApiProperty({ description: 'Relación con el solicitante' })
  @IsString()
  relacionSolicitante: string;

  @ApiProperty({ description: 'Tiempo de conocerlo' })
  @IsString()
  tiempoConocer: string;

  @ApiPropertyOptional({ type: EmpleoDto, description: 'Datos de empleo' })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmpleoDto)
  empleo?: EmpleoDto;

  @ApiPropertyOptional({ type: DomicilioDto, description: 'Domicilio de la empresa' })
  @IsOptional()
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilioEmpresa?: DomicilioDto;

  @ApiPropertyOptional({ description: 'Ingreso mensual' })
  @IsOptional()
  @IsNumber()
  ingresoMensual?: number;

  @ApiProperty({ description: 'Autoriza investigación de datos' })
  @IsBoolean()
  autorizaInvestigacion: boolean;

  @ApiProperty({ description: 'Declara veracidad de datos' })
  @IsBoolean()
  declaraVeracidad: boolean;

  @ApiPropertyOptional({ type: PropiedadGarantiaDto, description: 'Propiedad en garantía' })
  @IsOptional()
  @ValidateNested()
  @Type(() => PropiedadGarantiaDto)
  propiedadGarantia?: PropiedadGarantiaDto;
}