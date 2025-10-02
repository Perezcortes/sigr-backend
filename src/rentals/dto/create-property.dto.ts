// src/rentals/dto/create-property.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({ description: 'Tipo de propiedad', example: 'Casa' })
  @IsString()
  @IsNotEmpty()
  tipo: string;
  
  @ApiProperty({ description: 'Calle', example: 'Av. Hidalgo' })
  @IsString()
  @IsNotEmpty()
  calle: string;
  
  @ApiProperty({ description: 'Número exterior', example: '100' })
  @IsString()
  @IsNotEmpty()
  num_ext: string;

  @ApiPropertyOptional({ description: 'Número interior', example: 'A' })
  @IsOptional()
  @IsString()
  num_int?: string;

  @ApiPropertyOptional({ description: 'Referencias de ubicación', example: 'Frente al parque' })
  @IsOptional()
  @IsString()
  referencias_ubicacion?: string;

  @ApiProperty({ description: 'Colonia', example: 'Centro' })
  @IsString()
  @IsNotEmpty()
  colonia: string;

  @ApiProperty({ description: 'Municipio/Alcaldía', example: 'Oaxaca de Juárez' })
  @IsString()
  @IsNotEmpty()
  municipio: string;
  
  @ApiProperty({ description: 'Estado', example: 'Oaxaca' })
  @IsString()
  @IsNotEmpty()
  estado: string;

  @ApiProperty({ description: 'Código postal', example: '68000' })
  @IsString()
  @IsNotEmpty()
  codigo_postal: string;

  // Campos adicionales del propietario (como se especificó)
  @ApiProperty({ description: 'Metros cuadrados', example: 120.5 })
  @IsNumber()
  @IsNotEmpty()
  metros_cuadrados: number;

  @ApiProperty({ description: 'Monto de la renta', example: 15000.00 })
  @IsNumber()
  @IsNotEmpty()
  monto_renta: number;

  @ApiPropertyOptional({ description: 'Forma de pago de la renta', example: 'Transferencia' })
  @IsOptional() @IsString() pago_renta_forma?: string;
  
  @ApiPropertyOptional({ description: 'Otro método de pago', example: 'Otro' })
  @IsOptional() @IsString() pago_renta_otro_metodo?: string;

  @ApiPropertyOptional({ description: 'Titular de la cuenta para transferencia', example: 'Carlos Sánchez' })
  @IsOptional() @IsString() pago_renta_titular_cuenta?: string;
  
  @ApiPropertyOptional({ description: 'Número de cuenta para transferencia', example: '123456789' })
  @IsOptional() @IsString() pago_renta_num_cuenta?: string;
  
  @ApiPropertyOptional({ description: 'Nombre del banco para transferencia', example: 'BBVA' })
  @IsOptional() @IsString() pago_renta_banco?: string;
  
  @ApiPropertyOptional({ description: 'CLABE interbancaria para transferencia', example: '012345678901234567' })
  @IsOptional() @IsString() pago_renta_clabe?: string;

  @ApiPropertyOptional({ description: 'Uso de suelo', example: 'Habitacional' })
  @IsOptional() @IsString() uso_suelo?: string;
  
  @ApiPropertyOptional({ description: 'Permite mascotas', example: 'Sí' })
  @IsOptional() @IsString() mascotas_permitidas?: string;

  @ApiPropertyOptional({ description: 'Especificaciones para mascotas', example: 'Solo perros pequeños' })
  @IsOptional() @IsString() mascotas_especificacion?: string;
  
  @ApiPropertyOptional({ description: 'Selección del IVA en la renta', example: 'Sin IVA' })
  @IsOptional() @IsString() iva_en_renta?: string;

  @ApiPropertyOptional({ description: 'Frecuencia de pago de la renta', example: 'Mensual' })
  @IsOptional() @IsString() frecuencia_pago?: string;

  @ApiPropertyOptional({ description: 'Otra frecuencia de pago', example: 'Semestral' })
  @IsOptional() @IsString() frecuencia_pago_otra?: string;

  @ApiPropertyOptional({ description: 'Condiciones de pago', example: 'El pago se realiza en los primeros 5 días hábiles del mes.' })
  @IsOptional() @IsString() condiciones_pago?: string;
  
  @ApiPropertyOptional({ description: 'Cantidad del depósito en garantía', example: 15000.00 })
  @IsOptional() @IsNumber() deposito_garantia?: number;
  
  @ApiPropertyOptional({ description: 'Se paga mantenimiento', example: 'Sí' })
  @IsOptional() @IsString() paga_mantenimiento?: string;

  @ApiPropertyOptional({ description: 'Quién paga el mantenimiento', example: 'Arrendatario' })
  @IsOptional() @IsString() quien_paga_mantenimiento?: string;
  
  @ApiPropertyOptional({ description: 'Mantenimiento incluido en la renta', example: 'No' })
  @IsOptional() @IsString() mantenimiento_incluido?: string;

  @ApiPropertyOptional({ description: 'Costo mensual del mantenimiento', example: 500.00 })
  @IsOptional() @IsNumber() costo_mantenimiento_mensual?: number;
  
  @ApiPropertyOptional({ description: 'Instrucciones de pago del mantenimiento', example: 'Se paga directamente en la administración del edificio.' })
  @IsOptional() @IsString() instrucciones_pago?: string;
  
  @ApiPropertyOptional({ description: 'Se requiere contratar seguro', example: 'Sí' })
  @IsOptional() @IsString() requiere_seguro?: string;
  
  @ApiPropertyOptional({ description: 'Cobertura del seguro', example: 'Daños al inmueble, inundación' })
  @IsOptional() @IsString() cobertura_seguro?: string;
  
  @ApiPropertyOptional({ description: 'Monto de cobertura del seguro', example: 500000.00 })
  @IsOptional() @IsNumber() monto_cobertura_seguro?: number;
  
  @ApiPropertyOptional({ description: 'Servicios que se deberán pagar del inmueble', example: 'Luz, agua y gas' })
  @IsOptional() @IsString() servicios_a_pagar?: string;

  @ApiPropertyOptional({ description: 'Inventario del inmueble', example: 'Cortinas en todas las ventanas, calentador solar, estufa' })
  @IsOptional() @IsString() inventario?: string;
}