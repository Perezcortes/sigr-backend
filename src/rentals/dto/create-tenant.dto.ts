// src/rentals/dto/create-tenant.dto.ts
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

export class CreateTenantDto {
  @ApiProperty({
    description: 'Tipo de persona del inquilino',
    enum: TipoPersona,
    example: TipoPersona.FISICA,
  })
  @IsEnum(TipoPersona, { message: 'El tipo de persona debe ser "PF" (Persona Física) o "PM" (Persona Moral).' })
  tipo_persona: TipoPersona;

  // --- Persona Física (PF)
  @ApiPropertyOptional({ description: 'Nombres de la persona física', example: 'Gabriela' })
  @IsOptional() @IsString() pf_nombres?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno de la persona física', example: 'Torres' })
  @IsOptional() @IsString() pf_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno de la persona física', example: 'Soto' })
  @IsOptional() @IsString() pf_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Nacionalidad de la persona física', example: 'Mexicana' })
  @IsOptional() @IsString() pf_nacionalidad?: string;

  @ApiPropertyOptional({ description: 'Sexo de la persona física', example: 'Femenino' })
  @IsOptional() @IsString() pf_sexo?: string;

  @ApiPropertyOptional({ description: 'Estado civil de la persona física', example: 'Soltera' })
  @IsOptional() @IsString() pf_edo_civil?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico de la persona física', example: 'gabriela.t@mail.com' })
  @IsOptional() @IsEmail() pf_email?: string;

  @ApiPropertyOptional({ description: 'Tipo de identificación (INE, Pasaporte, etc.)', example: 'INE' })
  @IsOptional() @IsString() pf_id_tipo?: string;

  @ApiPropertyOptional({ description: 'Fecha de nacimiento de la persona física (YYYY-MM-DD)', example: '1990-05-15' })
  @IsOptional() @IsDateString() pf_fecha_nac?: string;

  @ApiPropertyOptional({ description: 'RFC de la persona física', example: 'TOSG900515ABC' })
  @IsOptional() @IsString() pf_rfc?: string;

  @ApiPropertyOptional({ description: 'CURP de la persona física', example: 'TOSGS900515HMCRN01' })
  @IsOptional() @IsString() pf_curp?: string;

  @ApiPropertyOptional({ description: 'Teléfono celular de la persona física', example: '9511112233' })
  @IsOptional() @IsString() pf_tel_cel?: string;

  @ApiPropertyOptional({ description: 'Teléfono fijo de la persona física', example: '9511112244' })
  @IsOptional() @IsString() pf_tel_fijo?: string;

  @ApiPropertyOptional({ description: 'Calle del domicilio actual de la persona física', example: 'Calle del Sol' })
  @IsOptional() @IsString() pf_dom_calle?: string;

  @ApiPropertyOptional({ description: 'Número exterior del domicilio actual', example: '10' })
  @IsOptional() @IsString() pf_dom_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior del domicilio actual', example: 'A' })
  @IsOptional() @IsString() pf_dom_num_int?: string;

  @ApiPropertyOptional({ description: 'Código postal del domicilio actual', example: '68000' })
  @IsOptional() @IsString() pf_dom_cp?: string;

  @ApiPropertyOptional({ description: 'Colonia del domicilio actual', example: 'Centro' })
  @IsOptional() @IsString() pf_dom_colonia?: string;

  @ApiPropertyOptional({ description: 'Delegación/Municipio del domicilio actual', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() pf_dom_municipio?: string;

  @ApiPropertyOptional({ description: 'Estado del domicilio actual', example: 'Oaxaca' })
  @IsOptional() @IsString() pf_dom_estado?: string;

  @ApiPropertyOptional({ description: 'Situación habitacional', example: 'Inquilino' })
  @IsOptional() @IsString() pf_sit_hab?: string;

  @ApiPropertyOptional({ description: 'Nombre del arrendador actual', example: 'Roberto' })
  @IsOptional() @IsString() pf_arr_act_nombre?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del arrendador actual', example: 'Perez' })
  @IsOptional() @IsString() pf_arr_act_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del arrendador actual', example: 'Lopez' })
  @IsOptional() @IsString() pf_arr_act_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Teléfono del arrendador actual', example: '9515556677' })
  @IsOptional() @IsString() pf_arr_act_tel?: string;

  @ApiPropertyOptional({ description: 'Renta que paga actualmente', example: 8000.0 })
  @IsOptional() @IsNumber() pf_arr_act_renta?: number;

  @ApiPropertyOptional({ description: 'Año de ingreso a la renta actual', example: 2020 })
  @IsOptional() @IsNumber() pf_arr_act_ano_ingreso?: number;

  @ApiPropertyOptional({ description: 'Profesión u oficio', example: 'Abogada' })
  @IsOptional() @IsString() pf_profesion?: string;

  @ApiPropertyOptional({ description: 'Tipo de empleo', example: 'Empleado' })
  @IsOptional() @IsString() pf_tipo_empleo?: string;

  @ApiPropertyOptional({ description: 'Teléfono del empleo', example: '9517778899' })
  @IsOptional() @IsString() pf_tel_empleo?: string;

  @ApiPropertyOptional({ description: 'Extensión telefónica del empleo', example: '123' })
  @IsOptional() @IsString() pf_ext_empleo?: string;

  @ApiPropertyOptional({ description: 'Nombre de la empresa', example: 'Bufete Legal S.A.' })
  @IsOptional() @IsString() pf_nom_empresa?: string;

  @ApiPropertyOptional({ description: 'Calle de la empresa', example: 'Av. Juarez' })
  @IsOptional() @IsString() pf_calle_empresa?: string;

  @ApiPropertyOptional({ description: 'Número exterior de la empresa', example: '500' })
  @IsOptional() @IsString() pf_num_ext_empresa?: string;

  @ApiPropertyOptional({ description: 'Número interior de la empresa', example: 'B' })
  @IsOptional() @IsString() pf_num_int_empresa?: string;

  @ApiPropertyOptional({ description: 'Código postal de la empresa', example: '68000' })
  @IsOptional() @IsString() pf_cp_empresa?: string;

  @ApiPropertyOptional({ description: 'Colonia de la empresa', example: 'Reforma' })
  @IsOptional() @IsString() pf_col_empresa?: string;

  @ApiPropertyOptional({ description: 'Delegación/Municipio de la empresa', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() pf_mun_empresa?: string;

  @ApiPropertyOptional({ description: 'Estado de la empresa', example: 'Oaxaca' })
  @IsOptional() @IsString() pf_edo_empresa?: string;

  @ApiPropertyOptional({ description: 'Fecha de ingreso al empleo (YYYY-MM-DD)', example: '2018-01-10' })
  @IsOptional() @IsDateString() pf_fecha_ing_empleo?: string;

  @ApiPropertyOptional({ description: 'Nombres del jefe inmediato', example: 'Jefe' })
  @IsOptional() @IsString() pf_jefe_nombres?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del jefe inmediato', example: 'Jefe' })
  @IsOptional() @IsString() pf_jefe_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del jefe inmediato', example: 'Jefe' })
  @IsOptional() @IsString() pf_jefe_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Teléfono del jefe inmediato', example: '9511234567' })
  @IsOptional() @IsString() pf_jefe_tel?: string;

  @ApiPropertyOptional({ description: 'Extensión telefónica del jefe inmediato', example: '101' })
  @IsOptional() @IsString() pf_jefe_ext?: string;

  @ApiPropertyOptional({ description: 'Ingreso mensual comprobable', example: 25000.0 })
  @IsOptional() @IsNumber() pf_ing_comprobable?: number;

  @ApiPropertyOptional({ description: 'Ingreso mensual no comprobable', example: 5000.0 })
  @IsOptional() @IsNumber() pf_ing_no_comprobable?: number;

  @ApiPropertyOptional({ description: 'Número de personas que dependen económicamente', example: 1 })
  @IsOptional() @IsNumber() pf_dependientes?: number;

  @ApiPropertyOptional({ description: 'Indica si otra persona aporta al ingreso familiar', example: false })
  @IsOptional() @IsBoolean() pf_ing_fam_aporta?: boolean;

  @ApiPropertyOptional({ description: 'Nombre de la primera referencia personal', example: 'Maria' })
  @IsOptional() @IsString() pf_ref_p1_nombre?: string;

  @ApiPropertyOptional({ description: 'Relación con la primera referencia personal', example: 'Amiga' })
  @IsOptional() @IsString() pf_ref_p1_relacion?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la primera referencia personal', example: '9511234567' })
  @IsOptional() @IsString() pf_ref_p1_tel?: string;

  @ApiPropertyOptional({ description: 'Nombre de la segunda referencia personal', example: 'Jose' })
  @IsOptional() @IsString() pf_ref_p2_nombre?: string;

  @ApiPropertyOptional({ description: 'Relación con la segunda referencia personal', example: 'Colega' })
  @IsOptional() @IsString() pf_ref_p2_relacion?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la segunda referencia personal', example: '9519876543' })
  @IsOptional() @IsString() pf_ref_p2_tel?: string;

  @ApiPropertyOptional({ description: 'Nombre de la primera referencia familiar', example: 'Luis' })
  @IsOptional() @IsString() pf_ref_f1_nombre?: string;

  @ApiPropertyOptional({ description: 'Relación con la primera referencia familiar', example: 'Hermano' })
  @IsOptional() @IsString() pf_ref_f1_relacion?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la primera referencia familiar', example: '9511122334' })
  @IsOptional() @IsString() pf_ref_f1_tel?: string;

  @ApiPropertyOptional({ description: 'Nombre de la segunda referencia familiar', example: 'Sofia' })
  @IsOptional() @IsString() pf_ref_f2_nombre?: string;

  @ApiPropertyOptional({ description: 'Relación con la segunda referencia familiar', example: 'Prima' })
  @IsOptional() @IsString() pf_ref_f2_relacion?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la segunda referencia familiar', example: '9514455667' })
  @IsOptional() @IsString() pf_ref_f2_tel?: string;

  // --- Persona Moral (PM)
  @ApiPropertyOptional({ description: 'Razón social de la persona moral', example: 'Grupo Inmobiliario del Sureste S.A. de C.V.' })
  @IsOptional() @IsString() pm_razon_social?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico de la persona moral', example: 'contacto@gissa.com' })
  @IsOptional() @IsEmail() pm_email?: string;

  @ApiPropertyOptional({ description: 'Dominio de internet de la empresa', example: 'gissa.com' })
  @IsOptional() @IsString() pm_dominio?: string;

  @ApiPropertyOptional({ description: 'RFC de la persona moral', example: 'GISSA101010ABC' })
  @IsOptional() @IsString() pm_rfc?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la persona moral', example: '9511114455' })
  @IsOptional() @IsString() pm_tel?: string;

  @ApiPropertyOptional({ description: 'Calle del domicilio de la empresa', example: 'Calle de la Empresa' })
  @IsOptional() @IsString() pm_calle?: string;

  @ApiPropertyOptional({ description: 'Número exterior del domicilio de la empresa', example: '100' })
  @IsOptional() @IsString() pm_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior del domicilio de la empresa', example: 'SN' })
  @IsOptional() @IsString() pm_num_int?: string;

  @ApiPropertyOptional({ description: 'Código postal de la empresa', example: '68000' })
  @IsOptional() @IsString() pm_cp?: string;

  @ApiPropertyOptional({ description: 'Colonia de la empresa', example: 'Centro' })
  @IsOptional() @IsString() pm_colonia?: string;

  @ApiPropertyOptional({ description: 'Municipio de la empresa', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() pm_municipio?: string;

  @ApiPropertyOptional({ description: 'Estado de la empresa', example: 'Oaxaca' })
  @IsOptional() @IsString() pm_estado?: string;

  @ApiPropertyOptional({ description: 'Ingreso mensual de la empresa', example: 500000.00 })
  @IsOptional() @IsNumber() pm_ing_mensual?: number;

  @ApiPropertyOptional({ description: 'Referencias de ubicación de la empresa', example: 'Cerca de la oficina de correos' })
  @IsOptional() @IsString() pm_ref_ubi?: string;

  @ApiPropertyOptional({ description: 'Nombre del notario del acta constitutiva', example: 'Notario' })
  @IsOptional() @IsString() pm_notario_nombre?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del notario del acta constitutiva', example: 'Legal' })
  @IsOptional() @IsString() pm_notario_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del notario del acta constitutiva', example: 'Oficial' })
  @IsOptional() @IsString() pm_notario_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Número de escritura del acta constitutiva', example: '5555' })
  @IsOptional() @IsString() pm_escritura_num?: string;

  @ApiPropertyOptional({ description: 'Fecha de constitución (YYYY-MM-DD)', example: '2015-02-20' })
  @IsOptional() @IsDateString() pm_fecha_const?: string;

  @ApiPropertyOptional({ description: 'Número de notario', example: 15 })
  @IsOptional() @IsNumber() pm_notario_num?: number;

  @ApiPropertyOptional({ description: 'Ciudad de registro del acta constitutiva', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() pm_ciudad_reg?: string;

  @ApiPropertyOptional({ description: 'Estado de registro del acta constitutiva', example: 'Oaxaca' })
  @IsOptional() @IsString() pm_estado_reg?: string;

  @ApiPropertyOptional({ description: 'Número de registro de la persona moral', example: 'A-123456' })
  @IsOptional() @IsString() pm_reg_num?: string;

  @ApiPropertyOptional({ description: 'Nombre del apoderado legal', example: 'Ricardo' })
  @IsOptional() @IsString() pm_apoderado_nombre?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del apoderado legal', example: 'Mendoza' })
  @IsOptional() @IsString() pm_apoderado_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del apoderado legal', example: 'López' })
  @IsOptional() @IsString() pm_apoderado_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Sexo del apoderado legal', example: 'Masculino' })
  @IsOptional() @IsString() pm_apoderado_sexo?: string;

  @ApiPropertyOptional({ description: 'Teléfono del apoderado legal', example: '9511114455' })
  @IsOptional() @IsString() pm_apoderado_tel?: string;

  @ApiPropertyOptional({ description: 'Extensión telefónica del apoderado legal', example: '1234' })
  @IsOptional() @IsString() pm_apoderado_ext?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico del apoderado legal', example: 'ricardo.m@gissa.com' })
  @IsOptional() @IsEmail() pm_apoderado_email?: string;

  @ApiPropertyOptional({ description: 'Indica si las facultades constan en el acta constitutiva', example: true })
  @IsOptional() @IsBoolean() pm_apoderado_facultades?: boolean;

  @ApiPropertyOptional({ description: 'Número de escritura del apoderado', example: '6666' })
  @IsOptional() @IsString() pm_apo_escritura_num?: string;

  @ApiPropertyOptional({ description: 'Número de notario del apoderado', example: 20 })
  @IsOptional() @IsNumber() pm_apo_notario_num?: number;

  @ApiPropertyOptional({ description: 'Fecha de la escritura o acta del apoderado (YYYY-MM-DD)', example: '2016-03-10' })
  @IsOptional() @IsDateString() pm_apo_fecha_escritura?: string;

  @ApiPropertyOptional({ description: 'Número de inscripción en el registro público del apoderado', example: 'B-654321' })
  @IsOptional() @IsString() pm_apo_reg_num?: string;

  @ApiPropertyOptional({ description: 'Ciudad de registro del apoderado', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() pm_apo_ciudad_reg?: string;

  @ApiPropertyOptional({ description: 'Estado de registro del apoderado', example: 'Oaxaca' })
  @IsOptional() @IsString() pm_apo_estado_reg?: string;

  @ApiPropertyOptional({ description: 'Tipo de representación', example: 'Administrador único' })
  @IsOptional() @IsString() pm_apo_tipo_rep?: string;

  @ApiPropertyOptional({ description: 'Nombre de la primera empresa de referencia comercial', example: 'Empresa 1' })
  @IsOptional() @IsString() pm_ref_c1_empresa?: string;

  @ApiPropertyOptional({ description: 'Nombre del contacto de la primera referencia comercial', example: 'Contacto 1' })
  @IsOptional() @IsString() pm_ref_c1_contacto?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la primera referencia comercial', example: '9511110001' })
  @IsOptional() @IsString() pm_ref_c1_tel?: string;

  @ApiPropertyOptional({ description: 'Nombre de la segunda empresa de referencia comercial', example: 'Empresa 2' })
  @IsOptional() @IsString() pm_ref_c2_empresa?: string;

  @ApiPropertyOptional({ description: 'Nombre del contacto de la segunda referencia comercial', example: 'Contacto 2' })
  @IsOptional() @IsString() pm_ref_c2_contacto?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la segunda referencia comercial', example: '9511110002' })
  @IsOptional() @IsString() pm_ref_c2_tel?: string;

  @ApiPropertyOptional({ description: 'Nombre de la tercera empresa de referencia comercial', example: 'Empresa 3' })
  @IsOptional() @IsString() pm_ref_c3_empresa?: string;

  @ApiPropertyOptional({ description: 'Nombre del contacto de la tercera referencia comercial', example: 'Contacto 3' })
  @IsOptional() @IsString() pm_ref_c3_contacto?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la tercera referencia comercial', example: '9511110003' })
  @IsOptional() @IsString() pm_ref_c3_tel?: string;

  // --- Campos Comunes (uso de propiedad)
  @ApiPropertyOptional({ description: 'Tipo de inmueble que desea rentar', example: 'Oficina' })
  @IsOptional() @IsString() prop_tipo_inmueble?: string;

  @ApiPropertyOptional({ description: 'Giro del negocio', example: 'Servicios inmobiliarios' })
  @IsOptional() @IsString() prop_giro_negocio?: string;

  @ApiPropertyOptional({ description: 'Breve experiencia en el giro', example: 'Más de 10 años en el mercado' })
  @IsOptional() @IsString() prop_experiencia_giro?: string;

  @ApiPropertyOptional({ description: 'Propósito del arrendamiento', example: 'Establecer oficina matriz' })
  @IsOptional() @IsString() prop_proposito?: string;

  @ApiPropertyOptional({ description: 'Indica si el inmueble sustituirá otro domicilio', example: true })
  @IsOptional() @IsBoolean() prop_reemplaza_dom?: boolean;

  @ApiPropertyOptional({ description: 'Calle del domicilio anterior', example: 'Calle Anterior' })
  @IsOptional() @IsString() prop_dom_ant_calle?: string;

  @ApiPropertyOptional({ description: 'Número exterior del domicilio anterior', example: 'SN' })
  @IsOptional() @IsString() prop_dom_ant_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior del domicilio anterior', example: 'SN' })
  @IsOptional() @IsString() prop_dom_ant_num_int?: string;

  @ApiPropertyOptional({ description: 'Código postal del domicilio anterior', example: '68000' })
  @IsOptional() @IsString() prop_dom_ant_cp?: string;

  @ApiPropertyOptional({ description: 'Colonia del domicilio anterior', example: 'Barrio' })
  @IsOptional() @IsString() prop_dom_ant_colonia?: string;

  @ApiPropertyOptional({ description: 'Municipio del domicilio anterior', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() prop_dom_ant_municipio?: string;

  @ApiPropertyOptional({ description: 'Estado del domicilio anterior', example: 'Oaxaca' })
  @IsOptional() @IsString() prop_dom_ant_estado?: string;

  @ApiPropertyOptional({ description: 'Motivo del cambio de domicilio', example: 'Expansión de la empresa' })
  @IsOptional() @IsString() prop_motivo_cambio?: string;
}