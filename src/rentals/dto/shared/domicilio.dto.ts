import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsPostalCode, Length } from 'class-validator';

export class DomicilioDto {
  @ApiProperty({ description: 'Calle del domicilio' })
  @IsString()
  calle: string;

  @ApiProperty({ description: 'Número exterior' })
  @IsString()
  numExt: string;

  @ApiPropertyOptional({ description: 'Número interior' })
  @IsOptional()
  @IsString()
  numInt?: string;

  @ApiProperty({ description: 'Código postal' })
  @IsPostalCode('MX')
  cp: string;

  @ApiProperty({ description: 'Colonia' })
  @IsString()
  colonia: string;

  @ApiProperty({ description: 'Municipio o alcaldía' })
  @IsString()
  municipio: string;

  @ApiProperty({ description: 'Estado' })
  @IsString()
  estado: string;

  @ApiPropertyOptional({ description: 'Referencias de ubicación' })
  @IsOptional()
  @IsString()
  referencias?: string;
}