import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsEnum, ValidateNested, IsArray, IsBoolean } from 'class-validator';
import { DatosPersonalesDto, ConyugeDto, DomicilioDto, EmpleoDto, JefeInmediatoDto, IngresosDto, AportanteIngresoDto, ReferenciaDto } from '../shared';

export enum SituacionHabitacional {
  INQUILINO = 'inquilino',
  PENSION_HOTEL = 'pension_hotel',
  CON_FAMILIA = 'con_familia',
  PROPIETARIO_PAGANDO = 'propietario_pagando',
  PROPIETARIO_LIBERADO = 'propietario_liberado'
}

export class ArrendadorActualDto {
  @ApiPropertyOptional({ description: 'Nombre(s) del arrendador actual' })
  @IsOptional()
  @IsString()
  nombres?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno' })
  @IsOptional()
  @IsString()
  apellidoPaterno?: string;

  @ApiPropertyOptional({ description: 'Apellido materno' })
  @IsOptional()
  @IsString()
  apellidoMaterno?: string;

  @ApiPropertyOptional({ description: 'Teléfono' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ description: 'Renta actual' })
  @IsOptional()
  @IsNumber()
  rentaActual?: number;

  @ApiPropertyOptional({ description: 'Año desde que ocupa el lugar' })
  @IsOptional()
  @IsString()
  ocupaDesde?: string;
}

export class InquilinoPfDto {
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

  @ApiProperty({ enum: SituacionHabitacional, description: 'Situación habitacional' })
  @IsEnum(SituacionHabitacional)
  situacionHabitacional: SituacionHabitacional;

  @ApiPropertyOptional({ type: ArrendadorActualDto, description: 'Arrendador actual' })
  @IsOptional()
  @ValidateNested()
  @Type(() => ArrendadorActualDto)
  arrendadorActual?: ArrendadorActualDto;

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

  @ApiPropertyOptional({ type: JefeInmediatoDto, description: 'Jefe inmediato' })
  @IsOptional()
  @ValidateNested()
  @Type(() => JefeInmediatoDto)
  jefeInmediato?: JefeInmediatoDto;

  @ApiPropertyOptional({ type: IngresosDto, description: 'Datos de ingresos' })
  @IsOptional()
  @ValidateNested()
  @Type(() => IngresosDto)
  ingresos?: IngresosDto;

  @ApiPropertyOptional({ type: [AportanteIngresoDto], description: 'Aportantes al ingreso' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AportanteIngresoDto)
  @IsArray()
  aportantesIngreso?: AportanteIngresoDto[];

  @ApiPropertyOptional({ type: [ReferenciaDto], description: 'Referencias personales' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReferenciaDto)
  @IsArray()
  referenciasPersonales?: ReferenciaDto[];

  @ApiPropertyOptional({ type: [ReferenciaDto], description: 'Referencias familiares' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReferenciaDto)
  @IsArray()
  referenciasFamiliares?: ReferenciaDto[];
}