import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { DatosEmpresaDto, ActaConstitutivaDto, RepresentanteLegalDto, DomicilioDto, DatosInmuebleDto, DatosPagoDto } from '../shared';

export class PropietarioPmDto {
  @ApiProperty({ type: DatosEmpresaDto, description: 'Datos de la empresa' })
  @ValidateNested()
  @Type(() => DatosEmpresaDto)
  datosEmpresa: DatosEmpresaDto;

  @ApiProperty({ type: DomicilioDto, description: 'Domicilio de la empresa' })
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilioEmpresa: DomicilioDto;

  @ApiProperty({ type: DatosPagoDto, description: 'Datos de pago' })
  @ValidateNested()
  @Type(() => DatosPagoDto)
  datosPago: DatosPagoDto;

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

  @ApiProperty({ type: DatosInmuebleDto, description: 'Datos del inmueble' })
  @ValidateNested()
  @Type(() => DatosInmuebleDto)
  datosInmueble: DatosInmuebleDto;

  @ApiProperty({ type: DomicilioDto, description: 'Dirección del inmueble' })
  @ValidateNested()
  @Type(() => DomicilioDto)
  direccionInmueble: DomicilioDto;
}