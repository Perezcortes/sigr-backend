import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, ValidateNested, IsBoolean, IsDateString } from 'class-validator';
import { DatosEmpresaDto, ActaConstitutivaDto, RepresentanteLegalDto, DomicilioDto } from '../shared';
import { PropiedadGarantiaDto } from './obligado-pf.dto';

export class ObligadoPmDto {
  @ApiProperty({ type: DatosEmpresaDto, description: 'Datos de la empresa' })
  @ValidateNested()
  @Type(() => DatosEmpresaDto)
  datosEmpresa: DatosEmpresaDto;

  @ApiProperty({ type: DomicilioDto, description: 'Domicilio de la empresa' })
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilioEmpresa: DomicilioDto;

  @ApiProperty({ type: ActaConstitutivaDto, description: 'Datos del acta constitutiva' })
  @ValidateNested()
  @Type(() => ActaConstitutivaDto)
  actaConstitutiva: ActaConstitutivaDto;

  @ApiProperty({ type: RepresentanteLegalDto, description: 'Representante legal' })
  @ValidateNested()
  @Type(() => RepresentanteLegalDto)
  representanteLegal: RepresentanteLegalDto;

  @ApiPropertyOptional({ type: DomicilioDto, description: 'Domicilio del representante' })
  @IsOptional()
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilioRepresentante?: DomicilioDto;

  @ApiPropertyOptional({ description: 'Antigüedad de la empresa' })
  @IsOptional()
  @IsString()
  antiguedadEmpresa?: string;

  @ApiPropertyOptional({ description: 'Actividades de la empresa' })
  @IsOptional()
  @IsString()
  actividadesEmpresa?: string;

  @ApiPropertyOptional({ description: 'Ingreso mensual aproximado' })
  @IsOptional()
  @IsNumber()
  ingresoMensual?: number;

  @ApiPropertyOptional({ type: PropiedadGarantiaDto, description: 'Propiedad en garantía' })
  @IsOptional()
  @ValidateNested()
  @Type(() => PropiedadGarantiaDto)
  propiedadGarantia?: PropiedadGarantiaDto;
}