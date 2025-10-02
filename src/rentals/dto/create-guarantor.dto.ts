// src/rentals/dto/create-guarantor.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export enum TipoPersona {
  FISICA = 'PF',
  MORAL = 'PM',
}

export class CreateGuarantorDto {
  @ApiProperty({
    description: 'Tipo de persona del obligado solidario',
    enum: TipoPersona,
    example: TipoPersona.FISICA,
  })
  @IsEnum(TipoPersona, { message: 'El tipo de persona debe ser "PF" (Persona Física) o "PM" (Persona Moral).' })
  tipo_persona: TipoPersona;

  // --- Persona Física (PF)
  // Información personal
  @ApiPropertyOptional({ description: 'Nombres del obligado solidario', example: 'Laura' })
  @IsOptional()
  @IsString()
  pf_nombres?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del obligado solidario', example: 'Lois' })
  @IsOptional()
  @IsString()
  pf_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del obligado solidario', example: 'Amador' })
  @IsOptional()
  @IsString()
  pf_apellido_m?: string;
  
  @ApiPropertyOptional({ description: 'Nacionalidad de la persona física', example: 'Mexicana' })
  @IsOptional()
  @IsString()
  pf_nacionalidad?: string;

  @ApiPropertyOptional({ description: 'Sexo de la persona física', example: 'Femenino' })
  @IsOptional()
  @IsString()
  pf_sexo?: string;

  @ApiPropertyOptional({ description: 'Estado civil de la persona física', example: 'Casada' })
  @IsOptional()
  @IsString()
  pf_edo_civil?: string;
  
  @ApiPropertyOptional({ description: 'Fecha de nacimiento de la persona física (YYYY-MM-DD)', example: '1985-11-20' })
  @IsOptional()
  @IsDateString()
  pf_fecha_nac?: string;
  
  @ApiPropertyOptional({ description: 'Tipo de identificación (INE, Pasaporte, etc.)', example: 'INE' })
  @IsOptional()
  @IsString()
  pf_id_tipo?: string;

  @ApiPropertyOptional({ description: 'CURP de la persona física', example: 'LOAM851120HABC' })
  @IsOptional()
  @IsString()
  pf_curp?: string;

  @ApiPropertyOptional({ description: 'RFC de la persona física', example: 'LOAM851120123' })
  @IsOptional()
  @IsString()
  pf_rfc?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico de la persona física', example: 'laura.lois@mail.com' })
  @IsOptional()
  @IsEmail()
  pf_email?: string;
  
  @ApiPropertyOptional({ description: 'Teléfono celular', example: '9516667788' })
  @IsOptional()
  @IsString()
  pf_tel_cel?: string;

  @ApiPropertyOptional({ description: 'Teléfono fijo', example: '9516667799' })
  @IsOptional()
  @IsString()
  pf_tel_fijo?: string;
  
  @ApiPropertyOptional({ description: 'Relación con el inquilino', example: 'Amiga' })
  @IsOptional()
  @IsString()
  pf_relacion_inquilino?: string;
  
  @ApiPropertyOptional({ description: 'Tiempo de conocer al inquilino', example: '10 años' })
  @IsOptional()
  @IsString()
  pf_tiempo_conocerlo?: string;

  // Domicilio actual PF
  @ApiPropertyOptional({ description: 'Calle del domicilio actual', example: 'Calle de la Luna' })
  @IsOptional()
  @IsString()
  pf_dom_calle?: string;
  
  @ApiPropertyOptional({ description: 'Número exterior del domicilio actual', example: '35' })
  @IsOptional()
  @IsString()
  pf_dom_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior del domicilio actual', example: 'SN' })
  @IsOptional()
  @IsString()
  pf_dom_num_int?: string;
  
  @ApiPropertyOptional({ description: 'Código postal del domicilio actual', example: '68000' })
  @IsOptional()
  @IsString()
  pf_dom_cp?: string;
  
  @ApiPropertyOptional({ description: 'Colonia del domicilio actual', example: 'Centro' })
  @IsOptional()
  @IsString()
  pf_dom_colonia?: string;
  
  @ApiPropertyOptional({ description: 'Delegación/Municipio del domicilio actual', example: 'Oaxaca de Juárez' })
  @IsOptional()
  @IsString()
  pf_dom_municipio?: string;

  @ApiPropertyOptional({ description: 'Estado del domicilio actual', example: 'Oaxaca' })
  @IsOptional()
  @IsString()
  pf_dom_estado?: string;
  
  // Empleo e Ingresos PF
  @ApiPropertyOptional({ description: 'Nombre de la empresa', example: 'Constructora XYZ' })
  @IsOptional()
  @IsString()
  pf_nom_empresa?: string;
  
  @ApiPropertyOptional({ description: 'Fecha de ingreso al empleo (YYYY-MM-DD)', example: '2010-03-01' })
  @IsOptional()
  @IsDateString()
  pf_fecha_ing_empleo?: string;
  
  @ApiPropertyOptional({ description: 'Profesión u oficio', example: 'Arquitecta' })
  @IsOptional()
  @IsString()
  pf_profesion?: string;
  
  @ApiPropertyOptional({ description: 'Tipo de empleo', example: 'Empleado' })
  @IsOptional()
  @IsString()
  pf_tipo_empleo?: string;
  
  @ApiPropertyOptional({ description: 'Ingreso mensual', example: 35000.0 })
  @IsOptional()
  @IsNumber()
  pf_ing_mensual?: number;
  
  // Ubicación de la empresa PF
  @ApiPropertyOptional({ description: 'Calle de la empresa', example: 'Av. Central' })
  @IsOptional()
  @IsString()
  pf_empresa_calle?: string;
  
  @ApiPropertyOptional({ description: 'Número exterior de la empresa', example: '456' })
  @IsOptional()
  @IsString()
  pf_empresa_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior de la empresa', example: '1A' })
  @IsOptional()
  @IsString()
  pf_empresa_num_int?: string;
  
  @ApiPropertyOptional({ description: 'Código postal de la empresa', example: '68000' })
  @IsOptional()
  @IsString()
  pf_empresa_cp?: string;
  
  @ApiPropertyOptional({ description: 'Colonia de la empresa', example: 'Reforma' })
  @IsOptional()
  @IsString()
  pf_empresa_colonia?: string;

  @ApiPropertyOptional({ description: 'Delegación/Municipio de la empresa', example: 'Oaxaca de Juárez' })
  @IsOptional()
  @IsString()
  pf_empresa_municipio?: string;
  
  @ApiPropertyOptional({ description: 'Estado de la empresa', example: 'Oaxaca' })
  @IsOptional()
  @IsString()
  pf_empresa_estado?: string;
  
  @ApiPropertyOptional({ description: 'Teléfono de la empresa', example: '9513334455' })
  @IsOptional()
  @IsString()
  pf_empresa_tel?: string;
  
  @ApiPropertyOptional({ description: 'Extensión telefónica de la empresa', example: '101' })
  @IsOptional()
  @IsString()
  pf_empresa_ext?: string;

  // Propiedad en garantía PF (si aplica)
  @ApiPropertyOptional({ description: 'Calle de la propiedad en garantía', example: 'Calle de los Pinos' })
  @IsOptional()
  @IsString()
  pf_prop_garantia_calle?: string;
  
  @ApiPropertyOptional({ description: 'Número exterior de la propiedad en garantía', example: '10' })
  @IsOptional()
  @IsString()
  pf_prop_garantia_num_ext?: string;
  
  @ApiPropertyOptional({ description: 'Número interior de la propiedad en garantía', example: 'SN' })
  @IsOptional()
  @IsString()
  pf_prop_garantia_num_int?: string;
  
  @ApiPropertyOptional({ description: 'Código postal de la propiedad en garantía', example: '68010' })
  @IsOptional()
  @IsString()
  pf_prop_garantia_cp?: string;
  
  @ApiPropertyOptional({ description: 'Colonia de la propiedad en garantía', example: 'Reforma' })
  @IsOptional()
  @IsString()
  pf_prop_garantia_colonia?: string;
  
  @ApiPropertyOptional({ description: 'Delegación/Municipio de la propiedad en garantía', example: 'Oaxaca de Juárez' })
  @IsOptional()
  @IsString()
  pf_prop_garantia_municipio?: string;
  
  @ApiPropertyOptional({ description: 'Estado de la propiedad en garantía', example: 'Oaxaca' })
  @IsOptional()
  @IsString()
  pf_prop_garantia_estado?: string;
  
  @ApiPropertyOptional({ description: 'Número de escritura de la propiedad en garantía', example: '8976' })
  @IsOptional()
  @IsString()
  pf_escritura_num?: string;
  
  @ApiPropertyOptional({ description: 'Fecha de escritura (YYYY-MM-DD)', example: '2015-05-20' })
  @IsOptional()
  @IsDateString()
  pf_fecha_escritura?: string;
  
  @ApiPropertyOptional({ description: 'Nombre del notario', example: 'Juan' })
  @IsOptional()
  @IsString()
  pf_notario_nombre?: string;
  
  @ApiPropertyOptional({ description: 'Apellido paterno del notario', example: 'García' })
  @IsOptional()
  @IsString()
  pf_notario_apellido_p?: string;
  
  @ApiPropertyOptional({ description: 'Apellido materno del notario', example: 'Sosa' })
  @IsOptional()
  @IsString()
  pf_notario_apellido_m?: string;
  
  @ApiPropertyOptional({ description: 'Número de notaría', example: 15 })
  @IsOptional()
  @IsNumber()
  pf_notaria_num?: number;
  
  @ApiPropertyOptional({ description: 'Lugar de la notaría', example: 'Oaxaca de Juárez' })
  @IsOptional()
  @IsString()
  pf_notaria_lugar?: string;
  
  @ApiPropertyOptional({ description: 'Registro Público de la Propiedad', example: 'Libro 2, Sección B' })
  @IsOptional()
  @IsString()
  pf_reg_pub_prop?: string;
  
  @ApiPropertyOptional({ description: 'Folio real electrónico', example: '01-12345' })
  @IsOptional()
  @IsString()
  pf_folio_real_elec?: string;
  
  @ApiPropertyOptional({ description: 'Fecha de registro de propiedad (YYYY-MM-DD)', example: '2015-06-01' })
  @IsOptional()
  @IsDateString()
  pf_fecha_reg_prop?: string;
  
  @ApiPropertyOptional({ description: 'Número de boleta predial', example: '12345678' })
  @IsOptional()
  @IsString()
  pf_boleta_predial_num?: string;
  
  // --- Persona Moral (PM)
  // Información de la empresa
  @ApiPropertyOptional({ description: 'Razón social de la empresa', example: 'Servicios Legales y Contables del Sur S.C.' })
  @IsOptional()
  @IsString()
  pm_razon_social?: string;

  @ApiPropertyOptional({ description: 'RFC de la persona moral', example: 'SLCS050505ABC' })
  @IsOptional()
  @IsString()
  pm_rfc?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico de la persona moral', example: 'contacto@slcs.com' })
  @IsOptional()
  @IsEmail()
  pm_email?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la empresa', example: '9519998877' })
  @IsOptional()
  @IsString()
  pm_tel?: string;
  
  @ApiPropertyOptional({ description: 'Antigüedad de la empresa', example: '10 años' })
  @IsOptional()
  @IsString()
  pm_antiguedad_empresa?: string;

  @ApiPropertyOptional({ description: 'Ingreso mensual aproximado', example: 200000.0 })
  @IsOptional()
  @IsNumber()
  pm_ing_mensual?: number;
  
  @ApiPropertyOptional({ description: 'Actividades de la empresa', example: 'Servicios de consultoría legal y contable' })
  @IsOptional()
  @IsString()
  pm_actividades_empresa?: string;

  // Domicilio de la empresa PM
  @ApiPropertyOptional({ description: 'Calle del domicilio de la empresa', example: 'Calle Las Rosas' })
  @IsOptional()
  @IsString()
  pm_dom_calle?: string;
  
  @ApiPropertyOptional({ description: 'Número exterior del domicilio de la empresa', example: '200' })
  @IsOptional()
  @IsString()
  pm_dom_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior del domicilio de la empresa', example: 'SN' })
  @IsOptional()
  @IsString()
  pm_dom_num_int?: string;
  
  @ApiPropertyOptional({ description: 'Código postal del domicilio de la empresa', example: '68050' })
  @IsOptional()
  @IsString()
  pm_dom_cp?: string;
  
  @ApiPropertyOptional({ description: 'Colonia del domicilio de la empresa', example: 'Jardines del Valle' })
  @IsOptional()
  @IsString()
  pm_dom_colonia?: string;

  @ApiPropertyOptional({ description: 'Municipio del domicilio de la empresa', example: 'Oaxaca de Juárez' })
  @IsOptional()
  @IsString()
  pm_dom_municipio?: string;
  
  @ApiPropertyOptional({ description: 'Estado del domicilio de la empresa', example: 'Oaxaca' })
  @IsOptional()
  @IsString()
  pm_dom_estado?: string;

  // Acta constitutiva PM
  @ApiPropertyOptional({ description: 'Nombre del notario del acta constitutiva', example: 'Ana' })
  @IsOptional()
  @IsString()
  pm_notario_nombre?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del notario', example: 'Ramírez' })
  @IsOptional()
  @IsString()
  pm_notario_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del notario', example: 'Ruiz' })
  @IsOptional()
  @IsString()
  pm_notario_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Número de escritura del acta constitutiva', example: '1122' })
  @IsOptional()
  @IsString()
  pm_escritura_num?: string;

  @ApiPropertyOptional({ description: 'Fecha de constitución (YYYY-MM-DD)', example: '2005-05-05' })
  @IsOptional()
  @IsDateString()
  pm_fecha_const?: string;

  @ApiPropertyOptional({ description: 'Número de notario', example: 5 })
  @IsOptional()
  @IsNumber()
  pm_notario_num?: number;

  @ApiPropertyOptional({ description: 'Ciudad de registro del acta constitutiva', example: 'Oaxaca de Juárez' })
  @IsOptional()
  @IsString()
  pm_ciudad_reg?: string;
  
  @ApiPropertyOptional({ description: 'Estado de registro del acta constitutiva', example: 'Oaxaca' })
  @IsOptional()
  @IsString()
  pm_estado_reg?: string;
  
  @ApiPropertyOptional({ description: 'Número de registro de la persona moral', example: 'M-987654' })
  @IsOptional()
  @IsString()
  pm_reg_num?: string;
  
  @ApiPropertyOptional({ description: 'Giro comercial de la empresa', example: 'Servicios profesionales' })
  @IsOptional()
  @IsString()
  pm_giro_comercial?: string;

  // Representante Legal PM
  @ApiPropertyOptional({ description: 'Nombre del representante legal', example: 'José' })
  @IsOptional()
  @IsString()
  pm_apoderado_nombre?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del representante legal', example: 'Vázquez' })
  @IsOptional()
  @IsString()
  pm_apoderado_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del representante legal', example: 'Mora' })
  @IsOptional()
  @IsString()
  pm_apoderado_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Sexo del representante legal', example: 'Masculino' })
  @IsOptional()
  @IsString()
  pm_apoderado_sexo?: string;
  
  @ApiPropertyOptional({ description: 'RFC del representante legal', example: 'VAMJ750101ABC' })
  @IsOptional()
  @IsString()
  pm_apoderado_rfc?: string;

  @ApiPropertyOptional({ description: 'CURP del representante legal', example: 'VAMJ750101HOCRN02' })
  @IsOptional()
  @IsString()
  pm_apoderado_curp?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico del representante legal', example: 'jose.v@slcs.com' })
  @IsOptional()
  @IsEmail()
  pm_apoderado_email?: string;
  
  @ApiPropertyOptional({ description: 'Teléfono del representante legal', example: '9519998877' })
  @IsOptional()
  @IsString()
  pm_apoderado_tel?: string;

  // Domicilio del Representante Legal PM
  @ApiPropertyOptional({ description: 'Calle del domicilio del representante legal', example: 'Calle de los Robles' })
  @IsOptional()
  @IsString()
  pm_dom_rep_calle?: string;
  
  @ApiPropertyOptional({ description: 'Número exterior del domicilio del representante legal', example: '15' })
  @IsOptional()
  @IsString()
  pm_dom_rep_num_ext?: string;
  
  @ApiPropertyOptional({ description: 'Número interior del domicilio del representante legal', example: 'B' })
  @IsOptional()
  @IsString()
  pm_dom_rep_num_int?: string;
  
  @ApiPropertyOptional({ description: 'Código postal del domicilio del representante legal', example: '68000' })
  @IsOptional()
  @IsString()
  pm_dom_rep_cp?: string;

  @ApiPropertyOptional({ description: 'Colonia del domicilio del representante legal', example: 'Centro' })
  @IsOptional()
  @IsString()
  pm_dom_rep_colonia?: string;
  
  @ApiPropertyOptional({ description: 'Municipio del domicilio del representante legal', example: 'Oaxaca de Juárez' })
  @IsOptional()
  @IsString()
  pm_dom_rep_municipio?: string;
  
  @ApiPropertyOptional({ description: 'Estado del domicilio del representante legal', example: 'Oaxaca' })
  @IsOptional()
  @IsString()
  pm_dom_rep_estado?: string;

  // Facultades del Apoderado PM
  @ApiPropertyOptional({ description: 'Indica si las facultades constan en el acta constitutiva', example: true })
  @IsOptional()
  @IsBoolean()
  pm_apoderado_facultades?: boolean;
  
  @ApiPropertyOptional({ description: 'Número de escritura del apoderado', example: '3344' })
  @IsOptional()
  @IsString()
  pm_apo_escritura_num?: string;

  @ApiPropertyOptional({ description: 'Número de notario del apoderado', example: 2 })
  @IsOptional()
  @IsNumber()
  pm_apo_notario_num?: number;

  @ApiPropertyOptional({ description: 'Fecha de la escritura o acta del apoderado (YYYY-MM-DD)', example: '2006-01-20' })
  @IsOptional()
  @IsDateString()
  pm_apo_fecha_escritura?: string;

  @ApiPropertyOptional({ description: 'Número de inscripción en el registro público del apoderado', example: 'C-112233' })
  @IsOptional()
  @IsString()
  pm_apo_reg_num?: string;

  @ApiPropertyOptional({ description: 'Fecha de inscripción (YYYY-MM-DD)', example: '2006-02-05' })
  @IsOptional()
  @IsDateString()
  pm_apo_fecha_reg?: string;
  
  @ApiPropertyOptional({ description: 'Ciudad de registro del apoderado', example: 'Oaxaca de Juárez' })
  @IsOptional()
  @IsString()
  pm_apo_ciudad_reg?: string;
  
  @ApiPropertyOptional({ description: 'Estado de registro del apoderado', example: 'Oaxaca' })
  @IsOptional()
  @IsString()
  pm_apo_estado_reg?: string;
  
  @ApiPropertyOptional({ description: 'Tipo de representación', example: 'Administrador único' })
  @IsOptional()
  @IsString()
  pm_apo_tipo_rep?: string;

  // Propiedad en garantía PM (campos corregidos)
  @ApiPropertyOptional({ description: 'Número de escritura de la propiedad en garantía de la persona moral', example: '4567' })
  @IsOptional()
  @IsString()
  pm_prop_garantia_escritura_num?: string;

  @ApiPropertyOptional({ description: 'Fecha de escritura (YYYY-MM-DD) de la propiedad en garantía de la persona moral', example: '2018-07-15' })
  @IsOptional()
  @IsDateString()
  pm_prop_garantia_fecha_escritura?: string;

  @ApiPropertyOptional({ description: 'Nombre del notario de la propiedad en garantía de la persona moral', example: 'Carmen' })
  @IsOptional()
  @IsString()
  pm_prop_garantia_notario_nombre?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del notario de la propiedad en garantía de la persona moral', example: 'Gómez' })
  @IsOptional()
  @IsString()
  pm_prop_garantia_notario_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del notario de la propiedad en garantía de la persona moral', example: 'Núñez' })
  @IsOptional()
  @IsString()
  pm_prop_garantia_notario_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Número de notaría de la propiedad en garantía de la persona moral', example: 30 })
  @IsOptional()
  @IsNumber()
  pm_prop_garantia_notaria_num?: number;
  
  @ApiPropertyOptional({ description: 'Lugar de la notaría de la propiedad en garantía de la persona moral', example: 'Oaxaca de Juárez' })
  @IsOptional()
  @IsString()
  pm_prop_garantia_notaria_lugar?: string;
  
  @ApiPropertyOptional({ description: 'Registro Público de la Propiedad de la propiedad en garantía de la persona moral', example: 'Libro 5, Sección D' })
  @IsOptional()
  @IsString()
  pm_prop_garantia_reg_pub_prop?: string;
  
  @ApiPropertyOptional({ description: 'Folio real electrónico de la propiedad en garantía de la persona moral', example: '02-98765' })
  @IsOptional()
  @IsString()
  pm_prop_garantia_folio_real_elec?: string;

  @ApiPropertyOptional({ description: 'Fecha de registro de la propiedad en garantía de la persona moral (YYYY-MM-DD)', example: '2018-08-01' })
  @IsOptional()
  @IsDateString()
  pm_prop_garantia_fecha_reg_prop?: string;

  @ApiPropertyOptional({ description: 'Número de boleta predial de la propiedad en garantía de la persona moral', example: '98765432' })
  @IsOptional()
  @IsString()
  pm_prop_garantia_boleta_predial_num?: string;
}