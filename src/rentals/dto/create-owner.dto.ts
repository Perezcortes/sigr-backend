// src/rentals/dto/create-owner.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TipoPersona } from './create-guarantor.dto'; // Reutilizamos el enum del fiador

// Clase para datos bancarios
export class BankInfoDto {
  @ApiPropertyOptional({ description: 'Titular de la cuenta', example: 'Prueba Poliza Rentas' })
  @IsOptional() @IsString() titular_cuenta?: string;

  @ApiPropertyOptional({ description: 'Número de cuenta bancaria', example: '1234567890' })
  @IsOptional() @IsString() numero_cuenta?: string;

  @ApiPropertyOptional({ description: 'Nombre del banco', example: 'Banco Prueba' })
  @IsOptional() @IsString() nombre_banco?: string;

  @ApiPropertyOptional({ description: 'Clabe interbancaria', example: '012345678901234567' })
  @IsOptional() @IsString() clabe_interbancaria?: string;
}

// Clase para los datos del inmueble a arrendar
export class InmuebleArrendarDto {
  @ApiPropertyOptional({ description: 'Tipo de inmueble', example: 'Departamento' })
  @IsOptional() @IsString() tipo_inmueble?: string;

  @ApiPropertyOptional({ description: 'Uso de suelo', example: 'Habitacional' })
  @IsOptional() @IsString() uso_suelo?: string;

  @ApiPropertyOptional({ description: '¿Se aceptan mascotas?', example: true })
  @IsOptional() @IsBoolean() mascotas?: boolean;

  @ApiPropertyOptional({ description: 'Especificación sobre las mascotas', example: 'perro mediano' })
  @IsOptional() @IsString() especificacion_mascotas?: string;

  @ApiPropertyOptional({ description: 'Precio de la renta', example: 12500 })
  @IsOptional() @IsNumber() precio_renta?: number;

  @ApiPropertyOptional({ description: 'Si el IVA está incluido en la renta', example: 'IVA incluido' })
  @IsOptional() @IsString() iva_renta?: string;

  @ApiPropertyOptional({ description: 'Frecuencia de pago', example: 'Mensual' })
  @IsOptional() @IsString() frecuencia_pago?: string;

  @ApiPropertyOptional({ description: 'Condiciones de pago', example: 'los primeros dias del mes' })
  @IsOptional() @IsString() condiciones_pago?: string;

  @ApiPropertyOptional({ description: '¿Se paga mantenimiento?', example: true })
  @IsOptional() @IsBoolean() paga_mantenimiento?: boolean;

  @ApiPropertyOptional({ description: 'Quién paga el mantenimiento', example: 'Arrendador' })
  @IsOptional() @IsString() quien_paga_mantenimiento?: string;

  @ApiPropertyOptional({ description: 'Costo mensual de mantenimiento', example: 0 })
  @IsOptional() @IsNumber() costo_mantenimiento?: number;

  @ApiPropertyOptional({ description: '¿Se requiere contratar seguro?', example: true })
  @IsOptional() @IsBoolean() requiere_seguro?: boolean;

  @ApiPropertyOptional({ description: 'Cobertura del seguro', example: 'Desastres naturales' })
  @IsOptional() @IsString() cobertura_seguro?: string;
  
  @ApiPropertyOptional({ description: 'Monto que cubre el seguro', example: 0 })
  @IsOptional() @IsNumber() monto_seguro?: number;

  @ApiPropertyOptional({ description: 'Cantidad de depósito en garantía', example: 12500 })
  @IsOptional() @IsNumber() deposito_garantia?: number;

  @ApiPropertyOptional({ description: '¿El depósito está incluido en la renta?', example: false })
  @IsOptional() @IsBoolean() deposito_en_renta?: boolean;
  
  @ApiPropertyOptional({ description: 'Servicios que se deberán pagar', example: 'Luz, agua' })
  @IsOptional() @IsString() servicios_pago?: string;
  
  @ApiPropertyOptional({ description: 'Instrucciones de pago', example: 'Transferencia al 1111' })
  @IsOptional() @IsString() instrucciones_pago?: string;
}

// Clase para datos del representante del propietario
export class RepresentantePropietarioDto {
  @ApiPropertyOptional() @IsOptional() @IsString() nombre?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() apellido_p?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() apellido_m?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() sexo?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() rfc?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() curp?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() telefono?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() id_tipo?: string;
  
  // Domicilio del representante
  @ApiPropertyOptional() @IsOptional() @IsString() dom_calle?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_num_ext?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_num_int?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_cp?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_colonia?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_del_mun?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_estado?: string;
}

// DTO Principal para el Propietario
export class CreateOwnerDto {
  @ApiProperty({ description: 'Tipo de persona del propietario', enum: TipoPersona, example: TipoPersona.FISICA })
  @IsEnum(TipoPersona) tipo_persona: TipoPersona;

  // Datos de persona física
  @ApiPropertyOptional() @IsOptional() @IsString() nombre_pf?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() apellido_p_pf?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() apellido_m_pf?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() curp_pf?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() estado_civil_pf?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() regimen_casado_pf?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() sexo_pf?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() nacionalidad_pf?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() id_tipo_pf?: string;

  // Datos de persona moral
  @ApiPropertyOptional() @IsOptional() @IsString() nombre_empresa_pm?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() rfc_pm?: string;
  
  // Datos comunes
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() telefono?: string;
  
  // Domicilio del propietario
  @ApiPropertyOptional() @IsOptional() @IsString() dom_calle?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_num_ext?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_num_int?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_cp?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_colonia?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_del_mun?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_estado?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dom_referencias?: string;

  // Clases anidadas
  @ApiPropertyOptional({ description: 'Información bancaria del propietario' })
  @IsOptional() @ValidateNested() @Type(() => BankInfoDto)
  datos_bancarios?: BankInfoDto;

  @ApiPropertyOptional({ description: 'Datos del inmueble a arrendar' })
  @IsOptional() @ValidateNested() @Type(() => InmuebleArrendarDto)
  inmueble?: InmuebleArrendarDto;
  
  @ApiPropertyOptional({ description: 'Datos del representante del propietario' })
  @IsOptional() @ValidateNested() @Type(() => RepresentantePropietarioDto)
  representante?: RepresentantePropietarioDto;
}