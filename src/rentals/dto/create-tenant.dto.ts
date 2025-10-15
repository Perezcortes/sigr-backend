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
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Enum para el tipo de persona
export enum TipoPersona {
  FISICA = 'PF',
  MORAL = 'PM',
}

// Datos personales de una Persona Física (PF)
export class PersonaFisicaDto {
  @ApiPropertyOptional({ description: 'Nombres de la persona física', example: 'Marcos' })
  @IsOptional() @IsString() nombres?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno de la persona física', example: 'Martínez' })
  @IsOptional() @IsString() apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno de la persona física', example: 'Guzmán' })
  @IsOptional() @IsString() apellido_m?: string;

  @ApiPropertyOptional({ description: 'Nacionalidad de la persona física', example: 'Mexicana' })
  @IsOptional() @IsString() nacionalidad?: string;

  @ApiPropertyOptional({ description: 'Sexo de la persona física', example: 'Masculino' })
  @IsOptional() @IsString() sexo?: string;

  @ApiPropertyOptional({ description: 'Estado civil de la persona física', example: 'Casado' })
  @IsOptional() @IsString() edo_civil?: string;

  @ApiPropertyOptional({ description: 'Fecha de nacimiento (YYYY-MM-DD)', example: '2000-01-01' })
  @IsOptional() @IsDateString() fecha_nac?: string;

  @ApiPropertyOptional({ description: 'CURP de la persona física', example: '123456789123456789' })
  @IsOptional() @IsString() curp?: string;
  
  @ApiPropertyOptional({ description: 'Datos del cónyuge', example: 'Nombre (s): PRUEBA' })
  @IsOptional() @IsString() datos_conyuge?: string;
}

// Datos de Empleo e Ingresos de una Persona Física (PF)
export class EmpleoIngresosDto {
  @ApiPropertyOptional({ description: 'Profesión, oficio o puesto', example: 'Ventas' })
  @IsOptional() @IsString() profesion?: string;
  
  @ApiPropertyOptional({ description: 'Tipo de empleo', example: 'Empleado' })
  @IsOptional() @IsString() tipo_empleo?: string;
  
  @ApiPropertyOptional({ description: 'Nombre de la empresa', example: 'LIVERPOOL' })
  @IsOptional() @IsString() nom_empresa?: string;
  
  @ApiPropertyOptional({ description: 'Teléfono del empleo', example: '9519519519' })
  @IsOptional() @IsString() tel_empleo?: string;
  
  @ApiPropertyOptional({ description: 'Número de extensión', example: '100' })
  @IsOptional() @IsString() ext_empleo?: string;
  
  @ApiPropertyOptional({ description: 'Calle de la empresa', example: 'La Noria' })
  @IsOptional() @IsString() calle_empresa?: string;
  
  @ApiPropertyOptional({ description: 'Número exterior de la empresa', example: '100' })
  @IsOptional() @IsString() num_ext_empresa?: string;
  
  @ApiPropertyOptional({ description: 'Número interior de la empresa', example: 'SN' })
  @IsOptional() @IsString() num_int_empresa?: string;
  
  @ApiPropertyOptional({ description: 'Código postal de la empresa', example: '68000' })
  @IsOptional() @IsString() cp_empresa?: string;
  
  @ApiPropertyOptional({ description: 'Colonia de la empresa', example: 'CANDIANI' })
  @IsOptional() @IsString() col_empresa?: string;
  
  @ApiPropertyOptional({ description: 'Delegación o municipio de la empresa', example: 'OAXACA DE JUAREZ' })
  @IsOptional() @IsString() mun_empresa?: string;
  
  @ApiPropertyOptional({ description: 'Estado de la empresa', example: 'Oaxaca' })
  @IsOptional() @IsString() edo_empresa?: string;

  @ApiPropertyOptional({ description: 'Fecha de ingreso al empleo (YYYY-MM-DD)', example: '2020-01-01' })
  @IsOptional() @IsDateString() fecha_ing_empleo?: string;

  @ApiPropertyOptional({ description: 'Ingreso mensual comprobable', example: 30000 })
  @IsOptional() @IsNumber() ing_comprobable?: number;

  @ApiPropertyOptional({ description: 'Ingreso mensual no comprobable', example: 0 })
  @IsOptional() @IsNumber() ing_no_comprobable?: number;

  @ApiPropertyOptional({ description: 'Número de personas que dependen económicamente', example: 2 })
  @IsOptional() @IsNumber() dependientes?: number;

  @ApiPropertyOptional({ description: 'Indica si otra persona aporta al ingreso familiar', example: false })
  @IsOptional() @IsBoolean() ing_fam_aporta?: boolean;

  // Si otra persona aporta, se deberá llenar esto
  @ApiPropertyOptional({ description: 'Número de personas que aportan al ingreso familiar', example: 0 })
  @IsOptional() @IsNumber() num_aportan?: number;

  @ApiPropertyOptional({ description: 'Nombre de quien aporta', example: 'Maria' })
  @IsOptional() @IsString() aportante_nombre?: string;
  
  @ApiPropertyOptional({ description: 'Apellido paterno de quien aporta', example: 'Rojas' })
  @IsOptional() @IsString() aportante_apellido_p?: string;
  
  @ApiPropertyOptional({ description: 'Apellido materno de quien aporta', example: 'Cortes' })
  @IsOptional() @IsString() aportante_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Parentesco de quien aporta', example: 'Prima' })
  @IsOptional() @IsString() aportante_parentesco?: string;
  
  @ApiPropertyOptional({ description: 'Teléfono de quien aporta', example: '9519876543' })
  @IsOptional() @IsString() aportante_telefono?: string;
  
  @ApiPropertyOptional({ description: 'Empresa donde trabaja quien aporta', example: 'Amazon' })
  @IsOptional() @IsString() aportante_empresa?: string;
  
  @ApiPropertyOptional({ description: 'Ingreso mensual comprobable de quien aporta', example: 10000 })
  @IsOptional() @IsNumber() aportante_ingreso?: number;
}

// Datos de una Persona Moral (PM)
export class PersonaMoralDto {
  @ApiPropertyOptional({ description: 'Nombre de la empresa o razón social', example: 'Poliza de rentas' })
  @IsOptional() @IsString() razon_social?: string;

  @ApiPropertyOptional({ description: 'Dominio de internet de la empresa', example: 'polizaderentas.com' })
  @IsOptional() @IsString() dominio?: string;

  @ApiPropertyOptional({ description: 'Ingreso mensual promedio', example: 500000.00 })
  @IsOptional() @IsNumber() ing_mensual?: number;

  @ApiPropertyOptional({ description: 'Referencias de la ubicación', example: 'A un lado del parque' })
  @IsOptional() @IsString() ref_ubi?: string;

  @ApiPropertyOptional({ description: 'Nombre del notario', example: 'Juan' })
  @IsOptional() @IsString() notario_nombre?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del notario', example: 'Pérez' })
  @IsOptional() @IsString() notario_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del notario', example: 'López' })
  @IsOptional() @IsString() notario_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Número de escritura del acta constitutiva', example: '5555' })
  @IsOptional() @IsString() escritura_num?: string;

  @ApiPropertyOptional({ description: 'Fecha de constitución (YYYY-MM-DD)', example: '2015-02-20' })
  @IsOptional() @IsDateString() fecha_const?: string;

  @ApiPropertyOptional({ description: 'Número de notario', example: 15 })
  @IsOptional() @IsNumber() notario_num?: number;

  @ApiPropertyOptional({ description: 'Ciudad de registro del acta constitutiva', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() ciudad_reg?: string;

  @ApiPropertyOptional({ description: 'Estado de registro del acta constitutiva', example: 'Oaxaca' })
  @IsOptional() @IsString() estado_reg?: string;

  @ApiPropertyOptional({ description: 'Número de registro de la persona moral', example: 'A-123456' })
  @IsOptional() @IsString() reg_num?: string;

  @ApiPropertyOptional({ description: 'Nombre del apoderado legal', example: 'Ricardo' })
  @IsOptional() @IsString() apoderado_nombre?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del apoderado legal', example: 'Mendoza' })
  @IsOptional() @IsString() apoderado_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del apoderado legal', example: 'López' })
  @IsOptional() @IsString() apoderado_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Sexo del apoderado legal', example: 'Masculino' })
  @IsOptional() @IsString() apoderado_sexo?: string;

  @ApiPropertyOptional({ description: 'Teléfono del apoderado legal', example: '9511114455' })
  @IsOptional() @IsString() apoderado_tel?: string;

  @ApiPropertyOptional({ description: 'Extensión telefónica del apoderado legal', example: '1234' })
  @IsOptional() @IsString() apoderado_ext?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico del apoderado legal', example: 'ricardo.m@gissa.com' })
  @IsOptional() @IsEmail() apoderado_email?: string;

  @ApiPropertyOptional({ description: 'Indica si las facultades constan en el acta constitutiva', example: true })
  @IsOptional() @IsBoolean() apoderado_facultades?: boolean;

  @ApiPropertyOptional({ description: 'Escritura pública o acta número donde constan las facultades', example: '6666' })
  @IsOptional() @IsString() apo_escritura_num?: string;

  @ApiPropertyOptional({ description: 'Número de notario del apoderado', example: 20 })
  @IsOptional() @IsNumber() apo_notario_num?: number;

  @ApiPropertyOptional({ description: 'Fecha de la escritura o acta del apoderado (YYYY-MM-DD)', example: '2016-03-10' })
  @IsOptional() @IsDateString() apo_fecha_escritura?: string;

  @ApiPropertyOptional({ description: 'Número de inscripción en el registro público del apoderado', example: 'B-654321' })
  @IsOptional() @IsString() apo_reg_num?: string;

  @ApiPropertyOptional({ description: 'Ciudad de registro del apoderado', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() apo_ciudad_reg?: string;

  @ApiPropertyOptional({ description: 'Estado de registro del apoderado', example: 'Oaxaca' })
  @IsOptional() @IsString() apo_estado_reg?: string;

  @ApiPropertyOptional({ description: 'Fecha de inscripción', example: '2016-03-10' })
  @IsOptional() @IsDateString() apo_fecha_inscripcion?: string;
  
  @ApiPropertyOptional({ description: 'Tipo de representación', example: 'Administrador único' })
  @IsOptional() @IsString() apo_tipo_rep?: string;
}

// Datos de uso de propiedad, comunes para ambos tipos de inquilino
export class UsoPropiedadDto {
  @ApiPropertyOptional({ description: 'Tipo de inmueble que desea rentar', example: 'Local Comercial' })
  @IsOptional() @IsString() tipo_inm?: string;
  
  @ApiPropertyOptional({ description: 'Giro del negocio', example: 'Restaurante' })
  @IsOptional() @IsString() giro_neg?: string;
  
  @ApiPropertyOptional({ description: 'Breve descripción de la experiencia en el giro', example: 'Más de 10 años de experiencia...' })
  @IsOptional() @IsString() exp_giro?: string;
  
  @ApiPropertyOptional({ description: 'Propósitos del arrendamiento', example: 'Establecer una sucursal...' })
  @IsOptional() @IsString() propositos?: string;
  
  @ApiPropertyOptional({ description: 'Indica si el inmueble sustituirá a otro domicilio', example: true })
  @IsOptional() @IsBoolean() sustituye_dom?: boolean;
  
  // Si sustituye a otro domicilio
  @ApiPropertyOptional({ description: 'Calle del domicilio anterior', example: 'Av. Siempre Viva' })
  @IsOptional() @IsString() ant_calle?: string;
  
  @ApiPropertyOptional({ description: 'Número exterior del domicilio anterior', example: '123' })
  @IsOptional() @IsString() ant_num_ext?: string;
  
  @ApiPropertyOptional({ description: 'Número interior del domicilio anterior', example: '4B' })
  @IsOptional() @IsString() ant_num_int?: string;
  
  @ApiPropertyOptional({ description: 'Código postal del domicilio anterior', example: '06100' })
  @IsOptional() @IsString() ant_cp?: string;
  
  @ApiPropertyOptional({ description: 'Colonia del domicilio anterior', example: 'Roma Norte' })
  @IsOptional() @IsString() ant_colonia?: string;
  
  @ApiPropertyOptional({ description: 'Delegación o Municipio del domicilio anterior', example: 'Cuauhtémoc' })
  @IsOptional() @IsString() ant_del_mun?: string;
  
  @ApiPropertyOptional({ description: 'Estado del domicilio anterior', example: 'Ciudad de México' })
  @IsOptional() @IsString() ant_estado?: string;
  
  @ApiPropertyOptional({ description: 'Motivo del cambio de domicilio', example: 'Expansión de la empresa...' })
  @IsOptional() @IsString() motivo_cambio?: string;
}

// Referencias personales y familiares (para PF)
export class ReferenciasPersonalesDto {
  @ApiPropertyOptional({ description: 'Nombre de la primera referencia personal', example: 'Pedro' })
  @IsOptional() @IsString() per1_nombre?: string;
  @ApiPropertyOptional({ description: 'Apellido paterno', example: 'López' })
  @IsOptional() @IsString() per1_apellido_p?: string;
  @ApiPropertyOptional({ description: 'Apellido materno', example: 'Perez' })
  @IsOptional() @IsString() per1_apellido_m?: string;
  @ApiPropertyOptional({ description: 'Relación', example: 'Amigo' })
  @IsOptional() @IsString() per1_relacion?: string;
  @ApiPropertyOptional({ description: 'Teléfono', example: '951100006' })
  @IsOptional() @IsString() per1_telefono?: string;
  
  @ApiPropertyOptional({ description: 'Nombre de la segunda referencia personal', example: 'Juan' })
  @IsOptional() @IsString() per2_nombre?: string;
  @ApiPropertyOptional({ description: 'Apellido paterno', example: 'Pérez' })
  @IsOptional() @IsString() per2_apellido_p?: string;
  @ApiPropertyOptional({ description: 'Apellido materno', example: 'García' })
  @IsOptional() @IsString() per2_apellido_m?: string;
  @ApiPropertyOptional({ description: 'Relación', example: 'Amigo' })
  @IsOptional() @IsString() per2_relacion?: string;
  @ApiPropertyOptional({ description: 'Teléfono', example: '951100006' })
  @IsOptional() @IsString() per2_telefono?: string;
  
  @ApiPropertyOptional({ description: 'Nombre de la primera referencia familiar', example: 'Maria' })
  @IsOptional() @IsString() fam1_nombre?: string;
  @ApiPropertyOptional({ description: 'Apellido paterno', example: 'López' })
  @IsOptional() @IsString() fam1_apellido_p?: string;
  @ApiPropertyOptional({ description: 'Apellido materno', example: 'Pérez' })
  @IsOptional() @IsString() fam1_apellido_m?: string;
  @ApiPropertyOptional({ description: 'Relación', example: 'Hermana' })
  @IsOptional() @IsString() fam1_relacion?: string;
  @ApiPropertyOptional({ description: 'Teléfono', example: '951100008' })
  @IsOptional() @IsString() fam1_telefono?: string;
  
  @ApiPropertyOptional({ description: 'Nombre de la segunda referencia familiar', example: 'Mario' })
  @IsOptional() @IsString() fam2_nombre?: string;
  @ApiPropertyOptional({ description: 'Apellido paterno', example: 'Pérez' })
  @IsOptional() @IsString() fam2_apellido_p?: string;
  @ApiPropertyOptional({ description: 'Apellido materno', example: 'García' })
  @IsOptional() @IsString() fam2_apellido_m?: string;
  @ApiPropertyOptional({ description: 'Relación', example: 'Hermano' })
  @IsOptional() @IsString() fam2_relacion?: string;
  @ApiPropertyOptional({ description: 'Teléfono', example: '951100008' })
  @IsOptional() @IsString() fam2_telefono?: string;
}

// Referencias comerciales (para PM)
export class ReferenciasComercialesDto {
  @ApiPropertyOptional({ description: 'Nombre de la primera empresa de referencia comercial', example: 'Empresa 1' })
  @IsOptional() @IsString() c1_empresa?: string;
  @ApiPropertyOptional({ description: 'Nombre del contacto de la primera referencia comercial', example: 'Contacto 1' })
  @IsOptional() @IsString() c1_contacto?: string;
  @ApiPropertyOptional({ description: 'Teléfono de la primera referencia comercial', example: '9511110001' })
  @IsOptional() @IsString() c1_tel?: string;
  
  @ApiPropertyOptional({ description: 'Nombre de la segunda empresa de referencia comercial', example: 'Empresa 2' })
  @IsOptional() @IsString() c2_empresa?: string;
  @ApiPropertyOptional({ description: 'Nombre del contacto de la segunda referencia comercial', example: 'Contacto 2' })
  @IsOptional() @IsString() c2_contacto?: string;
  @ApiPropertyOptional({ description: 'Teléfono de la segunda referencia comercial', example: '9511110002' })
  @IsOptional() @IsString() c2_tel?: string;
  
  @ApiPropertyOptional({ description: 'Nombre de la tercera empresa de referencia comercial', example: 'Empresa 3' })
  @IsOptional() @IsString() c3_empresa?: string;
  @ApiPropertyOptional({ description: 'Nombre del contacto de la tercera referencia comercial', example: 'Contacto 3' })
  @IsOptional() @IsString() c3_contacto?: string;
  @ApiPropertyOptional({ description: 'Teléfono de la tercera referencia comercial', example: '9511110003' })
  @IsOptional() @IsString() c3_tel?: string;
}

// DTO Principal
export class CreateTenantDto {
  @ApiProperty({
    description: 'Tipo de persona del inquilino',
    enum: TipoPersona,
    example: TipoPersona.FISICA,
  })
  @IsEnum(TipoPersona, { message: 'El tipo de persona debe ser "PF" o "PM".' })
  tipo_persona: TipoPersona;

  // Campos comunes para ambos tipos
  @ApiPropertyOptional({ description: 'Correo electrónico', example: 'marcosmtzguzman@gmail.com' })
  @IsOptional() @IsEmail() email?: string;
  
  @ApiPropertyOptional({ description: 'RFC', example: 'ABCDEFGHIJKL' })
  @IsOptional() @IsString() rfc?: string;
  
  @ApiPropertyOptional({ description: 'Teléfono celular', example: '9519515951' })
  @IsOptional() @IsString() tel_cel?: string;

  @ApiPropertyOptional({ description: 'Teléfono fijo', example: '9519515951' })
  @IsOptional() @IsString() tel_fijo?: string;
  
  @ApiPropertyOptional({ description: 'Tipo de identificación', example: 'INE' })
  @IsOptional() @IsString() id_tipo?: string;

  @ApiPropertyOptional({ description: 'Calle del domicilio actual', example: 'OAXACA' })
  @IsOptional() @IsString() dom_calle?: string;
  
  @ApiPropertyOptional({ description: 'Número exterior del domicilio actual', example: '100' })
  @IsOptional() @IsString() dom_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior del domicilio actual', example: 'SN' })
  @IsOptional() @IsString() dom_num_int?: string;
  
  @ApiPropertyOptional({ description: 'Código postal del domicilio actual', example: '68000' })
  @IsOptional() @IsString() dom_cp?: string;
  
  @ApiPropertyOptional({ description: 'Colonia del domicilio actual', example: 'Centro' })
  @IsOptional() @IsString() dom_colonia?: string;
  
  @ApiPropertyOptional({ description: 'Delegación/Municipio del domicilio actual', example: 'OAXACA' })
  @IsOptional() @IsString() dom_municipio?: string;
  
  @ApiPropertyOptional({ description: 'Estado del domicilio actual', example: 'Oaxaca' })
  @IsOptional() @IsString() dom_estado?: string;
  
  @ApiPropertyOptional({ description: 'Situación habitacional', example: 'Inquilino' })
  @IsOptional() @IsString() sit_hab?: string;
  
  @ApiPropertyOptional({ description: 'Nombre del arrendador actual', example: 'PRUEBA' })
  @IsOptional() @IsString() arr_act_nombre?: string;
  
  @ApiPropertyOptional({ description: 'Apellido paterno del arrendador actual', example: 'PRUEBA' })
  @IsOptional() @IsString() arr_act_apellido_p?: string;
  
  @ApiPropertyOptional({ description: 'Apellido materno del arrendador actual', example: 'PRUEBA' })
  @IsOptional() @IsString() arr_act_apellido_m?: string;
  
  @ApiPropertyOptional({ description: 'Teléfono del arrendador actual', example: '9519519519' })
  @IsOptional() @IsString() arr_act_tel?: string;
  
  @ApiPropertyOptional({ description: 'Renta que paga actualmente', example: 10000 })
  @IsOptional() @IsNumber() arr_act_renta?: number;
  
  @ApiPropertyOptional({ description: 'Año en que ocupa el lugar', example: 2020 })
  @IsOptional() @IsNumber() arr_act_ano?: number;

  @ApiPropertyOptional({ description: 'Datos específicos de la persona física' })
  @IsOptional() @ValidateNested() @Type(() => PersonaFisicaDto)
  pf_datos?: PersonaFisicaDto;

  @ApiPropertyOptional({ description: 'Datos de empleo e ingresos (solo para PF)' })
  @IsOptional() @ValidateNested() @Type(() => EmpleoIngresosDto)
  pf_empleo_ingresos?: EmpleoIngresosDto;

  @ApiPropertyOptional({ description: 'Datos de la persona moral' })
  @IsOptional() @ValidateNested() @Type(() => PersonaMoralDto)
  pm_datos?: PersonaMoralDto;

  @ApiPropertyOptional({ description: 'Uso de propiedad, común para ambos tipos' })
  @IsOptional() @ValidateNested() @Type(() => UsoPropiedadDto)
  uso_propiedad?: UsoPropiedadDto;
  
  @ApiPropertyOptional({ description: 'Referencias personales y familiares (solo para PF)' })
  @IsOptional() @ValidateNested() @Type(() => ReferenciasPersonalesDto)
  pf_referencias?: ReferenciasPersonalesDto;

  @ApiPropertyOptional({ description: 'Referencias comerciales (solo para PM)' })
  @IsOptional() @ValidateNested() @Type(() => ReferenciasComercialesDto)
  pm_referencias?: ReferenciasComercialesDto;
}