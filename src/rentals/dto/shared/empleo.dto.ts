import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum, IsDateString, IsPhoneNumber, IsBoolean } from 'class-validator';

export enum TipoEmpleo {
  DUEÑO_NEGOCIO = 'dueño_negocio',
  EMPRESARIO = 'empresario',
  INDEPENDIENTE = 'independiente',
  EMPLEADO = 'empleado',
  COMISIONISTA = 'comisionista',
  JUBILADO = 'jubilado'
}

export class EmpleoDto {
  @ApiPropertyOptional({ description: 'Profesión, oficio o puesto' })
  @IsOptional()
  @IsString()
  profesion?: string;

  @ApiPropertyOptional({ enum: TipoEmpleo, description: 'Tipo de empleo' })
  @IsOptional()
  @IsEnum(TipoEmpleo)
  tipoEmpleo?: TipoEmpleo;

  @ApiPropertyOptional({ description: 'Teléfono' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ description: 'Número de extensión' })
  @IsOptional()
  @IsString()
  extension?: string;

  @ApiPropertyOptional({ description: 'Empresa donde trabaja' })
  @IsOptional()
  @IsString()
  empresa?: string;

  @ApiPropertyOptional({ description: 'Fecha de ingreso (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  fechaIngreso?: string;
}

export class JefeInmediatoDto {
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

  @ApiPropertyOptional({ description: 'Teléfono de oficina' })
  @IsOptional()
  @IsPhoneNumber('MX')
  telefonoOficina?: string;

  @ApiPropertyOptional({ description: 'Número de extensión' })
  @IsOptional()
  @IsString()
  extension?: string;
}

export class IngresosDto {
  @ApiPropertyOptional({ description: 'Ingreso mensual comprobable' })
  @IsOptional()
  @IsNumber()
  ingresoComprobable?: number;

  @ApiPropertyOptional({ description: 'Ingreso mensual no comprobable' })
  @IsOptional()
  @IsNumber()
  ingresoNoComprobable?: number;

  @ApiPropertyOptional({ description: 'Número de personas que dependen' })
  @IsOptional()
  @IsNumber()
  personasDependen?: number;

  @ApiPropertyOptional({ description: '¿Otra persona aporta al ingreso?' })
  @IsOptional()
  @IsBoolean()
  otraPersonaAporta?: boolean;
}

export class AportanteIngresoDto {
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

  @ApiPropertyOptional({ description: 'Parentesco' })
  @IsOptional()
  @IsString()
  parentesco?: string;

  @ApiPropertyOptional({ description: 'Teléfono' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ description: 'Empresa donde trabaja' })
  @IsOptional()
  @IsString()
  empresa?: string;

  @ApiPropertyOptional({ description: 'Ingreso mensual comprobable' })
  @IsOptional()
  @IsNumber()
  ingresoComprobable?: number;
}