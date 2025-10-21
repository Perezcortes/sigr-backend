// src/rentals/dto/create-rental.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsEnum, ValidateNested, IsBoolean } from 'class-validator';
import { InquilinoPfDto, InquilinoPmDto, UsoPropiedadDto } from './inquilino';
import { ObligadoPfDto, ObligadoPmDto } from './obligado-solidario';
import { PropietarioPfDto, PropietarioPmDto } from './propietario';
import { DomicilioDto } from './shared/domicilio.dto';
import { DatosInmuebleDto } from './shared/propiedad.dto';

export enum TipoPersona {
  FISICA = 'fisica',
  MORAL = 'moral'
}

export class CreateRentalDto {
  @ApiProperty({ enum: TipoPersona, description: 'Tipo de persona del inquilino' })
  @IsEnum(TipoPersona)
  tipoInquilino: TipoPersona;

  @ApiProperty({ enum: TipoPersona, description: 'Tipo de persona del obligado solidario' })
  @IsEnum(TipoPersona)
  tipoObligado: TipoPersona;

  @ApiProperty({ enum: TipoPersona, description: 'Tipo de persona del propietario' })
  @IsEnum(TipoPersona)
  tipoPropietario: TipoPersona;

  @ApiPropertyOptional({ type: InquilinoPfDto, description: 'Datos del inquilino persona física' })
  @IsOptional()
  @ValidateNested()
  @Type(() => InquilinoPfDto)
  inquilinoPf?: InquilinoPfDto;

  @ApiPropertyOptional({ type: InquilinoPmDto, description: 'Datos del inquilino persona moral' })
  @IsOptional()
  @ValidateNested()
  @Type(() => InquilinoPmDto)
  inquilinoPm?: InquilinoPmDto;

  @ApiPropertyOptional({ type: UsoPropiedadDto, description: 'Uso de la propiedad' })
  @IsOptional()
  @ValidateNested()
  @Type(() => UsoPropiedadDto)
  usoPropiedad?: UsoPropiedadDto;

  @ApiPropertyOptional({ type: ObligadoPfDto, description: 'Datos del obligado solidario persona física' })
  @IsOptional()
  @ValidateNested()
  @Type(() => ObligadoPfDto)
  obligadoPf?: ObligadoPfDto;

  @ApiPropertyOptional({ type: ObligadoPmDto, description: 'Datos del obligado solidario persona moral' })
  @IsOptional()
  @ValidateNested()
  @Type(() => ObligadoPmDto)
  obligadoPm?: ObligadoPmDto;

  @ApiPropertyOptional({ type: PropietarioPfDto, description: 'Datos del propietario persona física' })
  @IsOptional()
  @ValidateNested()
  @Type(() => PropietarioPfDto)
  propietarioPf?: PropietarioPfDto;

  @ApiPropertyOptional({ type: PropietarioPmDto, description: 'Datos del propietario persona moral' })
  @IsOptional()
  @ValidateNested()
  @Type(() => PropietarioPmDto)
  propietarioPm?: PropietarioPmDto;

  // DATOS DE DOMICILIO DE LA PROPIEDAD
  @ApiProperty({ type: DomicilioDto, description: 'Domicilio de la propiedad' })
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilioPropiedad: DomicilioDto;

  // DATOS DEL INMUEBLE
  @ApiProperty({ type: DatosInmuebleDto, description: 'Datos del inmueble' })
  @ValidateNested()
  @Type(() => DatosInmuebleDto)
  datosInmueble: DatosInmuebleDto;

  @ApiPropertyOptional({ description: 'Observaciones' })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiProperty({ description: 'Usuario que crea la renta' })
  @IsString()
  usuarioCreacion: string;
}