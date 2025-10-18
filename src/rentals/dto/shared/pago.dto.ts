import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

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