import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class ReferenciaDto {
  @ApiPropertyOptional({ description: 'Nombre(s)' })
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

  @ApiPropertyOptional({ description: 'Relación' })
  @IsOptional()
  @IsString()
  relacion?: string;

  @ApiPropertyOptional({ description: 'Teléfono' })
  @IsOptional()
  @IsPhoneNumber('MX')
  telefono?: string;
}

export class ReferenciaComercialDto {
  @ApiPropertyOptional({ description: 'Nombre de la empresa' })
  @IsOptional()
  @IsString()
  nombreEmpresa?: string;

  @ApiPropertyOptional({ description: 'Nombre del contacto' })
  @IsOptional()
  @IsString()
  nombreContacto?: string;

  @ApiPropertyOptional({ description: 'Teléfono' })
  @IsOptional()
  @IsPhoneNumber('MX')
  telefono?: string;
}