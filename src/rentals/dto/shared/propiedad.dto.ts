import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean } from 'class-validator';

export enum TipoInmueble {
  CASA = 'casa',
  DEPARTAMENTO = 'departamento',
  LOCAL_COMERCIAL = 'local_comercial',
  OFICINA = 'oficina',
  BODEGA = 'bodega',
  NAVE_INDUSTRIAL = 'nave_industrial',
  CONSULTORIO = 'consultorio',
  TERRENO = 'terreno'
}

export enum UsoSuelo {
  HABITACIONAL = 'habitacional',
  COMERCIAL = 'comercial',
  INDUSTRIAL = 'industrial'
}

export enum FrecuenciaPago {
  MENSUAL = 'mensual',
  SEMANAL = 'semanal',
  QUINCENAL = 'quincenal',
  SEMESTRAL = 'semestral',
  ANUAL = 'anual',
  OTRA = 'otra'
}

export enum IvaRenta {
  INCLUIDO = 'incluido',
  MAS_IVA = 'mas_iva',
  SIN_IVA = 'sin_iva'
}

export class DatosInmuebleDto {
  @ApiProperty({ enum: TipoInmueble, description: 'Tipo de inmueble' })
  @IsEnum(TipoInmueble)
  tipoInmueble: TipoInmueble;

  @ApiProperty({ enum: UsoSuelo, description: 'Uso de suelo' })
  @IsEnum(UsoSuelo)
  usoSuelo: UsoSuelo;

  @ApiProperty({ description: '¿Se permiten mascotas?' })
  @IsBoolean()
  mascotas: boolean;

  @ApiPropertyOptional({ description: 'Especifique mascotas' })
  @IsOptional()
  @IsString()
  mascotasEspecifique?: string;

  @ApiProperty({ description: 'Precio de renta' })
  @IsNumber()
  precioRenta: number;

  @ApiProperty({ enum: IvaRenta, description: 'IVA en la renta' })
  @IsEnum(IvaRenta)
  ivaRenta: IvaRenta;

  @ApiProperty({ enum: FrecuenciaPago, description: 'Frecuencia de pago' })
  @IsEnum(FrecuenciaPago)
  frecuenciaPago: FrecuenciaPago;

  @ApiPropertyOptional({ description: 'Otra frecuencia de pago' })
  @IsOptional()
  @IsString()
  otraFrecuencia?: string;

  @ApiProperty({ description: 'Condiciones de pago' })
  @IsString()
  condicionesPago: string;

  @ApiProperty({ description: 'Depósito en garantía' })
  @IsNumber()
  depositoGarantia: number;

  @ApiProperty({ description: '¿Se paga mantenimiento?' })
  @IsBoolean()
  pagaMantenimiento: boolean;

  @ApiPropertyOptional({ description: '¿Quién paga mantenimiento?' })
  @IsOptional()
  @IsString()
  quienPagaMantenimiento?: string;

  @ApiPropertyOptional({ description: '¿Incluido en renta?' })
  @IsOptional()
  @IsBoolean()
  mantenimientoIncluido?: boolean;

  @ApiPropertyOptional({ description: 'Costo mensual mantenimiento' })
  @IsOptional()
  @IsNumber()
  costoMantenimiento?: number;

  @ApiPropertyOptional({ description: 'Instrucciones de pago' })
  @IsOptional()
  @IsString()
  instruccionesPago?: string;

  @ApiProperty({ description: '¿Requiere seguro?' })
  @IsBoolean()
  requiereSeguro: boolean;

  @ApiPropertyOptional({ description: 'Cobertura del seguro' })
  @IsOptional()
  @IsString()
  coberturaSeguro?: string;

  @ApiPropertyOptional({ description: 'Monto que cubre el seguro' })
  @IsOptional()
  @IsNumber()
  montoSeguro?: number;

  @ApiPropertyOptional({ description: 'Servicios a pagar' })
  @IsOptional()
  @IsString()
  serviciosPagar?: string;

  @ApiPropertyOptional({ description: 'Inventario del inmueble' })
  @IsOptional()
  @IsString()
  inventario?: string;
}