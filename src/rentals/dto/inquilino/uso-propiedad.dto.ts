import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DomicilioDto } from '../shared/domicilio.dto';

export enum TipoInmuebleUso {
  LOCAL = 'local',
  OFICINA = 'oficina',
  CONSULTORIO = 'consultorio',
  BODEGA = 'bodega',
  NAVE_INDUSTRIAL = 'nave_industrial'
}

export class UsoPropiedadDto {
  @ApiProperty({ enum: TipoInmuebleUso, description: 'Tipo de inmueble a rentar' })
  @IsEnum(TipoInmuebleUso)
  tipoInmueble: TipoInmuebleUso;

  @ApiProperty({ description: 'Giro del negocio' })
  @IsString()
  giroNegocio: string;

  @ApiProperty({ description: 'Experiencia en el giro' })
  @IsString()
  experienciaGiro: string;

  @ApiProperty({ description: 'Propósitos del arrendamiento' })
  @IsString()
  propositos: string;

  @ApiProperty({ description: '¿Sustituirá otro domicilio?' })
  @IsBoolean()
  sustituyeDomicilio: boolean;

  @ApiPropertyOptional({ type: DomicilioDto, description: 'Domicilio anterior' })
  @IsOptional()
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilioAnterior?: DomicilioDto;

  @ApiPropertyOptional({ description: 'Motivo del cambio' })
  @IsOptional()
  @IsString()
  motivoCambio?: string;
}