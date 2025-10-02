// src/rentals/dto/create-owner.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsNotEmpty, IsEmail, IsBoolean, IsDateString } from 'class-validator';

export enum TipoPersonaOwner {
  FISICA = 'fisica',
  MORAL = 'moral',
}

export class CreateOwnerDto {
  @ApiProperty({ description: 'Tipo de persona del propietario', enum: TipoPersonaOwner, example: TipoPersonaOwner.FISICA })
  @IsString()
  @IsNotEmpty()
  tipo_persona: TipoPersonaOwner;

  // --- Persona Física (PF)
  @ApiPropertyOptional({ description: 'Nombres del propietario', example: 'Carlos' })
  @IsOptional() @IsString() pf_nombres?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del propietario', example: 'Sánchez' })
  @IsOptional() @IsString() pf_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del propietario', example: 'Ramírez' })
  @IsOptional() @IsString() pf_apellido_m?: string;

  @ApiPropertyOptional({ description: 'CURP de la persona física', example: 'SARC800101HOCRN01' })
  @IsOptional() @IsString() pf_curp?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico', example: 'carlos.s@mail.com' })
  @IsOptional() @IsEmail() pf_email?: string;

  @ApiPropertyOptional({ description: 'Teléfono', example: '9512223344' })
  @IsOptional() @IsString() pf_tel?: string;

  @ApiPropertyOptional({ description: 'Estado civil', example: 'Casado' })
  @IsOptional() @IsString() pf_edo_civil?: string;

  @ApiPropertyOptional({ description: 'Régimen matrimonial (si es casado)', example: 'Sociedad conyugal' })
  @IsOptional() @IsString() pf_regimen_mat?: string;

  @ApiPropertyOptional({ description: 'Sexo', example: 'Masculino' })
  @IsOptional() @IsString() pf_sexo?: string;

  @ApiPropertyOptional({ description: 'Nacionalidad', example: 'Mexicana' })
  @IsOptional() @IsString() pf_nacionalidad?: string;

  @ApiPropertyOptional({ description: 'Tipo de identificación', example: 'INE' })
  @IsOptional() @IsString() pf_id_tipo?: string;

  @ApiPropertyOptional({ description: 'RFC', example: 'SARC800101ABC' })
  @IsOptional() @IsString() pf_rfc?: string;

  @ApiPropertyOptional({ description: 'Calle del domicilio actual', example: 'Av. Las Palmas' })
  @IsOptional() @IsString() pf_dom_calle?: string;

  @ApiPropertyOptional({ description: 'Número exterior', example: '50' })
  @IsOptional() @IsString() pf_dom_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior', example: 'SN' })
  @IsOptional() @IsString() pf_dom_num_int?: string;

  @ApiPropertyOptional({ description: 'Código postal', example: '68010' })
  @IsOptional() @IsString() pf_dom_cp?: string;

  @ApiPropertyOptional({ description: 'Colonia', example: 'Reforma' })
  @IsOptional() @IsString() pf_dom_colonia?: string;

  @ApiPropertyOptional({ description: 'Delegación/Municipio', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() pf_dom_municipio?: string;

  @ApiPropertyOptional({ description: 'Estado', example: 'Oaxaca' })
  @IsOptional() @IsString() pf_dom_estado?: string;

  @ApiPropertyOptional({ description: 'Referencias del domicilio', example: 'Esquina con calle Rosas' })
  @IsOptional() @IsString() pf_dom_ref?: string;

  @ApiPropertyOptional({ description: 'Forma en la que se pagará la renta', example: 'Transferencia' })
  @IsOptional() @IsString() pf_forma_pago_renta?: string;

  @ApiPropertyOptional({ description: 'Otro método de pago', example: 'Criptomonedas' })
  @IsOptional() @IsString() pf_pago_otro_metodo?: string;

  @ApiPropertyOptional({ description: 'Titular de la cuenta', example: 'Carlos Sánchez Ramírez' })
  @IsOptional() @IsString() pf_titular_cuenta?: string;

  @ApiPropertyOptional({ description: 'Número de cuenta', example: '1234567890' })
  @IsOptional() @IsString() pf_num_cuenta?: string;

  @ApiPropertyOptional({ description: 'Nombre del banco', example: 'BBVA Bancomer' })
  @IsOptional() @IsString() pf_nombre_banco?: string;

  @ApiPropertyOptional({ description: 'CLABE interbancaria', example: '012345678901234567' })
  @IsOptional() @IsString() pf_clabe_interbancaria?: string;

  // Datos del inmueble a arrendar
  @ApiPropertyOptional({ description: 'Tipo de inmueble', example: 'Casa' })
  @IsOptional() @IsString() pf_prop_tipo_inmueble?: string;

  @ApiPropertyOptional({ description: 'Uso de suelo', example: 'Habitacional' })
  @IsOptional() @IsString() pf_prop_uso_suelo?: string;

  @ApiPropertyOptional({ description: 'Permite mascotas', example: 'Sí' })
  @IsOptional() @IsString() pf_prop_mascotas?: string;

  @ApiPropertyOptional({ description: 'Especificaciones sobre mascotas', example: 'Solo perros pequeños' })
  @IsOptional() @IsString() pf_prop_mascotas_especif?: string;

  @ApiPropertyOptional({ description: 'Precio de renta', example: 15000.00 })
  @IsOptional() @IsNumber() pf_prop_precio_renta?: number;

  @ApiPropertyOptional({ description: 'Selección del IVA', example: 'Sin IVA' })
  @IsOptional() @IsString() pf_prop_iva?: string;

  @ApiPropertyOptional({ description: 'Frecuencia de pago de renta', example: 'Mensual' })
  @IsOptional() @IsString() pf_prop_frec_pago?: string;

  @ApiPropertyOptional({ description: 'Otra frecuencia de pago', example: 'Bimestral' })
  @IsOptional() @IsString() pf_prop_frec_pago_otra?: string;

  @ApiPropertyOptional({ description: 'Condiciones de pago', example: 'Primeros 5 días hábiles del mes' })
  @IsOptional() @IsString() pf_prop_condiciones_pago?: string;

  @ApiPropertyOptional({ description: 'Cantidad de depósito en garantía', example: 15000.00 })
  @IsOptional() @IsNumber() pf_prop_deposito_garantia?: number;

  @ApiPropertyOptional({ description: 'Se paga mantenimiento', example: 'Sí' })
  @IsOptional() @IsString() pf_prop_paga_mantenimiento?: string;

  @ApiPropertyOptional({ description: 'Quién paga el mantenimiento', example: 'Arrendatario' })
  @IsOptional() @IsString() pf_prop_quien_paga_mantenimiento?: string;

  @ApiPropertyOptional({ description: 'Mantenimiento incluido en la renta', example: 'No' })
  @IsOptional() @IsString() pf_prop_mantenimiento_incluido?: string;

  @ApiPropertyOptional({ description: 'Costo mensual del mantenimiento', example: 500.00 })
  @IsOptional() @IsNumber() pf_prop_costo_mantenimiento?: number;

  @ApiPropertyOptional({ description: 'Instrucciones de pago del mantenimiento', example: 'Transferencia a la cuenta 987654321' })
  @IsOptional() @IsString() pf_prop_instrucciones_pago?: string;

  @ApiPropertyOptional({ description: 'Se requiere contratar seguro', example: 'Sí' })
  @IsOptional() @IsString() pf_prop_requiere_seguro?: string;

  @ApiPropertyOptional({ description: 'Cobertura del seguro', example: 'Daños al inmueble' })
  @IsOptional() @IsString() pf_prop_cobertura_seguro?: string;

  @ApiPropertyOptional({ description: 'Monto que cubre el seguro', example: 500000.00 })
  @IsOptional() @IsNumber() pf_prop_monto_seguro?: number;

  @ApiPropertyOptional({ description: 'Servicios que se deberán pagar del inmueble', example: 'Luz y agua' })
  @IsOptional() @IsString() pf_prop_servicios_pago?: string;
  
  @ApiPropertyOptional({ description: 'Referencias del domicilio del inmueble', example: 'Cerca del parque central' })
  @IsOptional() @IsString() pf_prop_ref?: string;
  
  @ApiPropertyOptional({ description: 'Inventario del inmueble', example: 'Cortinas y calentador solar' })
  @IsOptional() @IsString() pf_prop_inventario?: string;
  
  // Representación del propietario PF
  @ApiPropertyOptional({ description: 'Indica si el propietario será representado', example: false })
  @IsOptional() @IsBoolean() pf_representado?: boolean;

  @ApiPropertyOptional({ description: 'Tipo de representación', example: 'Poder notarial' })
  @IsOptional() @IsString() pf_rep_tipo_rep?: string;

  @ApiPropertyOptional({ description: 'Nombres del representante', example: 'Representante' })
  @IsOptional() @IsString() pf_rep_nombres?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del representante', example: 'Legal' })
  @IsOptional() @IsString() pf_rep_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del representante', example: 'Pérez' })
  @IsOptional() @IsString() pf_rep_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Sexo del representante', example: 'Masculino' })
  @IsOptional() @IsString() pf_rep_sexo?: string;

  @ApiPropertyOptional({ description: 'CURP del representante', example: 'LEPP850101HOCRN01' })
  @IsOptional() @IsString() pf_rep_curp?: string;

  @ApiPropertyOptional({ description: 'Tipo de identificación del representante', example: 'INE' })
  @IsOptional() @IsString() pf_rep_id_tipo?: string;

  @ApiPropertyOptional({ description: 'RFC del representante', example: 'LEPP850101ABC' })
  @IsOptional() @IsString() pf_rep_rfc?: string;

  @ApiPropertyOptional({ description: 'Teléfono del representante', example: '9511112233' })
  @IsOptional() @IsString() pf_rep_tel?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico del representante', example: 'representante@mail.com' })
  @IsOptional() @IsEmail() pf_rep_email?: string;

  @ApiPropertyOptional({ description: 'Calle del domicilio del representante', example: 'Calle Girasoles' })
  @IsOptional() @IsString() pf_rep_dom_calle?: string;

  @ApiPropertyOptional({ description: 'Número exterior del domicilio del representante', example: '45' })
  @IsOptional() @IsString() pf_rep_dom_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior del domicilio del representante', example: 'SN' })
  @IsOptional() @IsString() pf_rep_dom_num_int?: string;

  @ApiPropertyOptional({ description: 'Código postal del domicilio del representante', example: '68000' })
  @IsOptional() @IsString() pf_rep_dom_cp?: string;

  @ApiPropertyOptional({ description: 'Colonia del domicilio del representante', example: 'Centro' })
  @IsOptional() @IsString() pf_rep_dom_colonia?: string;

  @ApiPropertyOptional({ description: 'Delegación/Municipio del domicilio del representante', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() pf_rep_dom_municipio?: string;

  @ApiPropertyOptional({ description: 'Estado del domicilio del representante', example: 'Oaxaca' })
  @IsOptional() @IsString() pf_rep_dom_estado?: string;

  // --- Persona Moral (PM)
  @ApiPropertyOptional({ description: 'Razón social de la empresa', example: 'Inversiones Patrimoniales del Centro S.A.' })
  @IsOptional() @IsString() pm_razon_social?: string;

  @ApiPropertyOptional({ description: 'RFC de la empresa', example: 'IPC850101ABC' })
  @IsOptional() @IsString() pm_rfc?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico de la empresa', example: 'info@ipacsa.com' })
  @IsOptional() @IsEmail() pm_email?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la empresa', example: '9512225566' })
  @IsOptional() @IsString() pm_tel?: string;

  @ApiPropertyOptional({ description: 'Antigüedad de la empresa', example: '15 años' })
  @IsOptional() @IsString() pm_antiguedad_empresa?: string;

  @ApiPropertyOptional({ description: 'Ingreso mensual de la empresa', example: 1000000.00 })
  @IsOptional() @IsNumber() pm_ing_mensual?: number;

  @ApiPropertyOptional({ description: 'Actividades de la empresa', example: 'Gestión de inversiones inmobiliarias y proyectos de construcción.' })
  @IsOptional() @IsString() pm_actividades_empresa?: string;

  @ApiPropertyOptional({ description: 'Calle del domicilio de la empresa', example: 'Av. Benito Juárez' })
  @IsOptional() @IsString() pm_dom_calle?: string;
  
  @ApiPropertyOptional({ description: 'Número exterior del domicilio de la empresa', example: '300' })
  @IsOptional() @IsString() pm_dom_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior del domicilio de la empresa', example: '5' })
  @IsOptional() @IsString() pm_dom_num_int?: string;
  
  @ApiPropertyOptional({ description: 'Código postal del domicilio de la empresa', example: '68000' })
  @IsOptional() @IsString() pm_dom_cp?: string;
  
  @ApiPropertyOptional({ description: 'Colonia del domicilio de la empresa', example: 'Centro' })
  @IsOptional() @IsString() pm_dom_colonia?: string;

  @ApiPropertyOptional({ description: 'Municipio del domicilio de la empresa', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() pm_dom_municipio?: string;
  
  @ApiPropertyOptional({ description: 'Estado del domicilio de la empresa', example: 'Oaxaca' })
  @IsOptional() @IsString() pm_dom_estado?: string;
  
  @ApiPropertyOptional({ description: 'Nombre del notario del acta constitutiva', example: 'Notario Público' })
  @IsOptional() @IsString() pm_notario_nombre?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del notario', example: 'Pérez' })
  @IsOptional() @IsString() pm_notario_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del notario', example: 'López' })
  @IsOptional() @IsString() pm_notario_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Número de escritura del acta constitutiva', example: '12345' })
  @IsOptional() @IsString() pm_escritura_num?: string;

  @ApiPropertyOptional({ description: 'Fecha de constitución (YYYY-MM-DD)', example: '2005-01-01' })
  @IsOptional() @IsDateString() pm_fecha_const?: string;

  @ApiPropertyOptional({ description: 'Número de notario', example: 10 })
  @IsOptional() @IsNumber() pm_notario_num?: number;

  @ApiPropertyOptional({ description: 'Ciudad de registro del acta constitutiva', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() pm_ciudad_reg?: string;

  @ApiPropertyOptional({ description: 'Estado de registro del acta constitutiva', example: 'Oaxaca' })
  @IsOptional() @IsString() pm_estado_reg?: string;
  
  @ApiPropertyOptional({ description: 'Número de registro de la persona moral', example: 'R-54321' })
  @IsOptional() @IsString() pm_reg_num?: string;

  @ApiPropertyOptional({ description: 'Giro comercial de la empresa', example: 'Inmobiliario' })
  @IsOptional() @IsString() pm_giro_comercial?: string;

  // Representación del propietario PM
  @ApiPropertyOptional({ description: 'Indica si el propietario será representado', example: true })
  @IsOptional() @IsBoolean() pm_representado?: boolean;

  @ApiPropertyOptional({ description: 'Tipo de representación', example: 'Poder notarial' })
  @IsOptional() @IsString() pm_rep_tipo_rep?: string;

  @ApiPropertyOptional({ description: 'Nombres del representante', example: 'Ana' })
  @IsOptional() @IsString() pm_rep_nombres?: string;

  @ApiPropertyOptional({ description: 'Apellido paterno del representante', example: 'López' })
  @IsOptional() @IsString() pm_rep_apellido_p?: string;

  @ApiPropertyOptional({ description: 'Apellido materno del representante', example: 'Gómez' })
  @IsOptional() @IsString() pm_rep_apellido_m?: string;

  @ApiPropertyOptional({ description: 'Sexo del representante', example: 'Femenino' })
  @IsOptional() @IsString() pm_rep_sexo?: string;

  @ApiPropertyOptional({ description: 'CURP del representante', example: 'LOGA900101HOCRN01' })
  @IsOptional() @IsString() pm_rep_curp?: string;

  @ApiPropertyOptional({ description: 'Tipo de identificación del representante', example: 'INE' })
  @IsOptional() @IsString() pm_rep_id_tipo?: string;

  @ApiPropertyOptional({ description: 'RFC del representante', example: 'LOGA900101ABC' })
  @IsOptional() @IsString() pm_rep_rfc?: string;

  @ApiPropertyOptional({ description: 'Teléfono del representante', example: '9511115566' })
  @IsOptional() @IsString() pm_rep_tel?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico del representante', example: 'ana.l@ipacsa.com' })
  @IsOptional() @IsEmail() pm_rep_email?: string;

  @ApiPropertyOptional({ description: 'Calle del domicilio del representante', example: 'Calle del Árbol' })
  @IsOptional() @IsString() pm_rep_dom_calle?: string;
  
  @ApiPropertyOptional({ description: 'Número exterior del domicilio del representante', example: '20' })
  @IsOptional() @IsString() pm_rep_dom_num_ext?: string;

  @ApiPropertyOptional({ description: 'Número interior del domicilio del representante', example: 'A' })
  @IsOptional() @IsString() pm_rep_dom_num_int?: string;
  
  @ApiPropertyOptional({ description: 'Código postal del domicilio del representante', example: '68010' })
  @IsOptional() @IsString() pm_rep_dom_cp?: string;
  
  @ApiPropertyOptional({ description: 'Colonia del domicilio del representante', example: 'Reforma' })
  @IsOptional() @IsString() pm_rep_dom_colonia?: string;
  
  @ApiPropertyOptional({ description: 'Municipio del domicilio del representante', example: 'Oaxaca de Juárez' })
  @IsOptional() @IsString() pm_rep_dom_municipio?: string;
  
  @ApiPropertyOptional({ description: 'Estado del domicilio del representante', example: 'Oaxaca' })
  @IsOptional() @IsString() pm_rep_dom_estado?: string;
}