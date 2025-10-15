// src/rentals/dto/create-guarantor.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Enum para el tipo de persona, reutilizado del DTO del inquilino
export enum TipoPersona {
  FISICA = 'PF',
  MORAL = 'PM',
}

// Clase para datos compartidos del Fiador (Domicilio y Contacto principal)
export class DatosContactoFiadorDto {
  @ApiPropertyOptional({ description: 'Correo electrónico del fiador', example: 'lauloi.100@gmail.com' })
  @IsOptional() @IsEmail() email?: string;

  @ApiPropertyOptional({ description: 'Teléfono celular principal', example: '8877393939' })
  @IsOptional() @IsString() tel_cel?: string;

  @ApiPropertyOptional({ description: 'Teléfono fijo (o celular si no tiene fijo)', example: '8877393939' })
  @IsOptional() @IsString() tel_fijo?: string;
}

// Clase para datos de Empleo e Ingresos de Persona Física del Fiador
export class EmpleoIngresosFiadorPfDto {
  @ApiPropertyOptional({ description: 'Empresa donde trabaja', example: 'Restaurante equiz' })
  @IsOptional() @IsString() empresa?: string;

  @ApiPropertyOptional({ description: 'Profesión, oficio o puesto', example: 'direccion general' })
  @IsOptional() @IsString() profesion?: string;

  @ApiPropertyOptional({ description: 'Ingreso mensual', example: 30000 })
  @IsOptional() @IsNumber() ingreso_mensual?: number;

  @ApiPropertyOptional({ description: 'Fecha de ingreso al empleo (YYYY-MM-DD)', example: '2020-10-10' })
  @IsOptional() @IsDateString() fecha_ingreso?: string;

  @ApiPropertyOptional({ description: 'Tipo de empleo', example: 'Dueño de negocio' })
  @IsOptional() @IsString() tipo_empleo?: string;

  @ApiPropertyOptional({ description: 'Ubicación de la empresa - Calle', example: 'Calle de la empresa' })
  @IsOptional() @IsString() calle_empresa?: string;

  @ApiPropertyOptional({ description: 'Ubicación de la empresa - Número exterior', example: '100' })
  @IsOptional() @IsString() num_ext_empresa?: string;

  @ApiPropertyOptional({ description: 'Ubicación de la empresa - Número interior', example: 'SN' })
  @IsOptional() @IsString() num_int_empresa?: string;

  @ApiPropertyOptional({ description: 'Ubicación de la empresa - Código postal', example: '68000' })
  @IsOptional() @IsString() cp_empresa?: string;

  @ApiPropertyOptional({ description: 'Ubicación de la empresa - Colonia', example: 'La Noria' })
  @IsOptional() @IsString() col_empresa?: string;

  @ApiPropertyOptional({ description: 'Ubicación de la empresa - Delegación/Municipio', example: 'Oaxaca de Juarez' })
  @IsOptional() @IsString() del_mun_empresa?: string;

  @ApiPropertyOptional({ description: 'Ubicación de la empresa - Estado', example: 'Oaxaca' })
  @IsOptional() @IsString() edo_empresa?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la empresa', example: '8877393939' })
  @IsOptional() @IsString() tel_empresa?: string;

  @ApiPropertyOptional({ description: 'Número de extensión', example: '101' })
  @IsOptional() @IsString() ext_empresa?: string;
}

// Clase para datos de Propiedad en Garantía (opcional)
export class PropiedadGarantiaDto {
  @ApiPropertyOptional({ description: 'Calle de la propiedad en garantía', example: 'Calle en garantía' })
  @IsOptional() @IsString() calle?: string;
  @ApiPropertyOptional({ description: 'Número exterior', example: '200' })
  @IsOptional() @IsString() num_ext?: string;
  @ApiPropertyOptional({ description: 'Número interior', example: 'SN' })
  @IsOptional() @IsString() num_int?: string;
  @ApiPropertyOptional({ description: 'Código postal', example: '68000' })
  @IsOptional() @IsString() cp?: string;
  @ApiPropertyOptional({ description: 'Colonia', example: 'Colonia de la propiedad' })
  @IsOptional() @IsString() colonia?: string;
  @ApiPropertyOptional({ description: 'Delegación/Municipio', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() del_mun?: string;
  @ApiPropertyOptional({ description: 'Estado', example: 'Oaxaca' })
  @IsOptional() @IsString() estado?: string;

  @ApiPropertyOptional({ description: 'Número de escritura', example: '1234' })
  @IsOptional() @IsString() num_escritura?: string;
  @ApiPropertyOptional({ description: 'Nombre del notario', example: 'Notario Prueba' })
  @IsOptional() @IsString() notario_nombre?: string;
  @ApiPropertyOptional({ description: 'Apellido paterno del notario', example: 'Pérez' })
  @IsOptional() @IsString() notario_apellido_p?: string;
  @ApiPropertyOptional({ description: 'Apellido materno del notario', example: 'López' })
  @IsOptional() @IsString() notario_apellido_m?: string;
  @ApiPropertyOptional({ description: 'Número de notaría', example: 50 })
  @IsOptional() @IsNumber() num_notaria?: number;
  @ApiPropertyOptional({ description: 'Fecha de la escritura (YYYY-MM-DD)', example: '2015-05-20' })
  @IsOptional() @IsDateString() fecha_escritura?: string;
  @ApiPropertyOptional({ description: 'Lugar de la notaría', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() lugar_notaria?: string;

  @ApiPropertyOptional({ description: 'Registro Público de la Propiedad', example: 'Boleta 1234' })
  @IsOptional() @IsString() reg_pub_propiedad?: string;
  @ApiPropertyOptional({ description: 'No. de Boleta Predial', example: '98765' })
  @IsOptional() @IsString() no_boleta_predial?: string;
  @ApiPropertyOptional({ description: 'Folio real electrónico', example: 'A-123456' })
  @IsOptional() @IsString() folio_real_elec?: string;
  @ApiPropertyOptional({ description: 'Fecha del folio (YYYY-MM-DD)', example: '2015-05-20' })
  @IsOptional() @IsDateString() fecha_folio?: string;
}

// Clase para la información del Representante Legal (Fiador Persona Moral)
export class RepresentanteLegalDto {
  @ApiPropertyOptional({ description: 'Nombre del representante legal', example: 'Juan' })
  @IsOptional() @IsString() nombre?: string;
  @ApiPropertyOptional({ description: 'Apellido paterno', example: 'Pérez' })
  @IsOptional() @IsString() apellido_p?: string;
  @ApiPropertyOptional({ description: 'Apellido materno', example: 'López' })
  @IsOptional() @IsString() apellido_m?: string;
  @ApiPropertyOptional({ description: 'Sexo', example: 'Masculino' })
  @IsOptional() @IsString() sexo?: string;
  @ApiPropertyOptional({ description: 'RFC', example: 'PELE800101XYZ' })
  @IsOptional() @IsString() rfc?: string;
  @ApiPropertyOptional({ description: 'CURP', example: 'PELZ800101HMNCRN01' })
  @IsOptional() @IsString() curp?: string;
  @ApiPropertyOptional({ description: 'Correo electrónico', example: 'juan.perez@empresa.com' })
  @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional({ description: 'Teléfono', example: '9511112233' })
  @IsOptional() @IsString() telefono?: string;
  @ApiPropertyOptional({ description: 'Calle del domicilio', example: 'Calle del Sol' })
  @IsOptional() @IsString() calle_dom?: string;
  @ApiPropertyOptional({ description: 'Número exterior del domicilio', example: '10' })
  @IsOptional() @IsString() num_ext_dom?: string;
  @ApiPropertyOptional({ description: 'Número interior del domicilio', example: 'A' })
  @IsOptional() @IsString() num_int_dom?: string;
  @ApiPropertyOptional({ description: 'Código postal del domicilio', example: '68000' })
  @IsOptional() @IsString() cp_dom?: string;
  @ApiPropertyOptional({ description: 'Colonia del domicilio', example: 'Centro' })
  @IsOptional() @IsString() col_dom?: string;
  @ApiPropertyOptional({ description: 'Delegación/Municipio del domicilio', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() del_mun_dom?: string;
  @ApiPropertyOptional({ description: 'Estado del domicilio', example: 'Oaxaca' })
  @IsOptional() @IsString() edo_dom?: string;

  @ApiPropertyOptional({ description: '¿Sus facultades constan en el acta constitutiva?', example: false })
  @IsOptional() @IsBoolean() facultades_en_acta?: boolean;
  @ApiPropertyOptional({ description: 'Escritura pública o acta número', example: '6666' })
  @IsOptional() @IsString() escritura_num?: string;
  @ApiPropertyOptional({ description: 'Número de notario', example: 20 })
  @IsOptional() @IsNumber() notario_num?: number;
  @ApiPropertyOptional({ description: 'Fecha de escritura o acta (YYYY-MM-DD)', example: '2016-03-10' })
  @IsOptional() @IsDateString() fecha_escritura?: string;
  @ApiPropertyOptional({ description: 'Número de inscripción en el registro público', example: 'B-654321' })
  @IsOptional() @IsString() reg_num?: string;
  @ApiPropertyOptional({ description: 'Ciudad de registro', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() ciudad_reg?: string;
  @ApiPropertyOptional({ description: 'Estado de registro', example: 'Oaxaca' })
  @IsOptional() @IsString() edo_reg?: string;
  @ApiPropertyOptional({ description: 'Fecha de inscripción (YYYY-MM-DD)', example: '2016-03-10' })
  @IsOptional() @IsDateString() fecha_inscripcion?: string;
  @ApiPropertyOptional({ description: 'Tipo de representación', example: 'Administrador único' })
  @IsOptional() @IsString() tipo_representacion?: string;
  @ApiPropertyOptional({ description: 'Llenar en caso de otro tipo de representación', example: 'Gerente' })
  @IsOptional() @IsString() otro_tipo_representacion?: string;
}

// DTO Principal para el Fiador
export class CreateGuarantorDto {
  @ApiProperty({
    description: 'Tipo de persona del fiador',
    enum: TipoPersona,
    example: TipoPersona.FISICA,
  })
  @IsEnum(TipoPersona, { message: 'El tipo de persona debe ser "PF" o "PM".' })
  tipo_persona: TipoPersona;

  // Datos comunes a ambos tipos
  @ApiPropertyOptional({ description: 'Relación con el solicitante', example: 'Conocido' })
  @IsOptional() @IsString() relacion_solicitante?: string;
  @ApiPropertyOptional({ description: 'Tiempo de conocer al solicitante', example: '10 años' })
  @IsOptional() @IsString() tiempo_conociendolo?: string;
  @ApiPropertyOptional({ description: 'Nombre(s) del fiador', example: 'Juan' })
  @IsOptional() @IsString() nombre?: string;
  @ApiPropertyOptional({ description: 'Apellido paterno', example: 'Pérez' })
  @IsOptional() @IsString() apellido_p?: string;
  @ApiPropertyOptional({ description: 'Apellido materno', example: 'Prueba' })
  @IsOptional() @IsString() apellido_m?: string;
  @ApiPropertyOptional({ description: 'RFC', example: 'ABCD123456EFG' })
  @IsOptional() @IsString() rfc?: string;
  @ApiPropertyOptional({ description: 'Domicilio actual - Calle', example: 'Crespo' })
  @IsOptional() @IsString() dom_calle?: string;
  @ApiPropertyOptional({ description: 'Domicilio actual - Número exterior', example: '100' })
  @IsOptional() @IsString() dom_num_ext?: string;
  @ApiPropertyOptional({ description: 'Domicilio actual - Número interior', example: '5.1.' })
  @IsOptional() @IsString() dom_num_int?: string;
  @ApiPropertyOptional({ description: 'Domicilio actual - Código postal', example: '68000' })
  @IsOptional() @IsString() dom_cp?: string;
  @ApiPropertyOptional({ description: 'Domicilio actual - Colonia', example: 'Centro' })
  @IsOptional() @IsString() dom_colonia?: string;
  @ApiPropertyOptional({ description: 'Domicilio actual - Delegación/Municipio', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() dom_del_mun?: string;
  @ApiPropertyOptional({ description: 'Domicilio actual - Estado', example: 'Oaxaca' })
  @IsOptional() @IsString() dom_estado?: string;

  // Clases anidadas
  @ApiPropertyOptional({ description: 'Datos específicos para fiadores de persona física' })
  @IsOptional() @ValidateNested() @Type(() => EmpleoIngresosFiadorPfDto)
  pf_datos_empleo?: EmpleoIngresosFiadorPfDto;

  @ApiPropertyOptional({ description: 'Datos específicos para fiadores de persona moral' })
  @IsOptional() @ValidateNested() @Type(() => RepresentanteLegalDto)
  pm_representante_legal?: RepresentanteLegalDto;

  @ApiPropertyOptional({ description: 'Datos de la propiedad en garantía', type: () => PropiedadGarantiaDto })
  @IsOptional() @ValidateNested() @Type(() => PropiedadGarantiaDto)
  propiedad_garantia?: PropiedadGarantiaDto;
}