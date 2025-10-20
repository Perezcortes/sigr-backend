import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsEnum, ValidateNested, IsBoolean } from 'class-validator';
import { DatosPersonalesDto, DomicilioDto, DatosInmuebleDto } from '../shared';

export enum RegimenConyugal {
  SOCIEDAD_CONYUGAL = 'sociedad_conyugal',
  SEPARACION_BIENES = 'separacion_bienes'
}

export enum FormaPago {
  EFECTIVO = 'efectivo',
  TRANSFERENCIA = 'transferencia',
  CHEQUE = 'cheque',
  OTRO = 'otro'
}

export class DatosPagoDto {
  @ApiProperty({ enum: FormaPago, description: 'Forma de pago' })
  @IsEnum(FormaPago)
  formaPago: FormaPago;

  @ApiPropertyOptional({ description: 'Otra forma de pago' })
  @IsOptional()
  @IsString()
  otraFormaPago?: string;

  @ApiPropertyOptional({ description: 'Titular de la cuenta' })
  @IsOptional()
  @IsString()
  titularCuenta?: string;

  @ApiPropertyOptional({ description: 'Número de cuenta' })
  @IsOptional()
  @IsString()
  numeroCuenta?: string;

  @ApiPropertyOptional({ description: 'Nombre del banco' })
  @IsOptional()
  @IsString()
  banco?: string;

  @ApiPropertyOptional({ description: 'CLABE interbancaria' })
  @IsOptional()
  @IsString()
  clabe?: string;
}

export class RepresentantePropietarioDto {
  @ApiProperty({ description: '¿Será representado por tercero?' })
  @IsBoolean()
  representadoTercero: boolean;

  @ApiPropertyOptional({ description: 'Tipo de representación' })
  @IsOptional()
  @IsString()
  tipoRepresentacion?: string;

  @ApiPropertyOptional({ type: DatosPersonalesDto, description: 'Datos del representante' })
  @IsOptional()
  @ValidateNested()
  @Type(() => DatosPersonalesDto)
  datosRepresentante?: DatosPersonalesDto;

  @ApiPropertyOptional({ type: DomicilioDto, description: 'Domicilio del representante' })
  @IsOptional()
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilioRepresentante?: DomicilioDto;
}

export class PropietarioPfDto {
  @ApiProperty({ type: DatosPersonalesDto, description: 'Datos personales' })
  @ValidateNested()
  @Type(() => DatosPersonalesDto)
  datosPersonales: DatosPersonalesDto;

  @ApiProperty({ type: DomicilioDto, description: 'Domicilio actual' })
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilioActual: DomicilioDto;

  @ApiPropertyOptional({ description: 'Régimen conyugal' })
  @IsOptional()
  @IsEnum(RegimenConyugal)
  regimenConyugal?: RegimenConyugal;

  @ApiProperty({ type: DatosPagoDto, description: 'Datos de pago' })
  @ValidateNested()
  @Type(() => DatosPagoDto)
  datosPago: DatosPagoDto;

  @ApiProperty({ type: DatosInmuebleDto, description: 'Datos del inmueble' })
  @ValidateNested()
  @Type(() => DatosInmuebleDto)
  datosInmueble: DatosInmuebleDto;

  @ApiProperty({ type: DomicilioDto, description: 'Dirección del inmueble' })
  @ValidateNested()
  @Type(() => DomicilioDto)
  direccionInmueble: DomicilioDto;

  @ApiProperty({ type: RepresentantePropietarioDto, description: 'Representación' })
  @ValidateNested()
  @Type(() => RepresentantePropietarioDto)
  representacion: RepresentantePropietarioDto;
}