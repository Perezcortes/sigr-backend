import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { DatosEmpresaDto, ActaConstitutivaDto, RepresentanteLegalDto, DomicilioDto, ReferenciaComercialDto } from '../shared';
import { UsoPropiedadDto } from './uso-propiedad.dto';

export class InquilinoPmDto {
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

  @ApiProperty({ type: UsoPropiedadDto, description: 'Uso de la propiedad' })
  @ValidateNested()
  @Type(() => UsoPropiedadDto)
  usoPropiedad: UsoPropiedadDto;

  @ApiProperty({ type: [ReferenciaComercialDto], description: 'Referencias comerciales' })
  @ValidateNested({ each: true })
  @Type(() => ReferenciaComercialDto)
  @IsArray()
  referenciasComerciales: ReferenciaComercialDto[];
}