// src/rentals/entities/tenant.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('inquilinos')
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_persona' })
  tipo_persona: 'PF' | 'PM';

  // --- Persona Física (PF)
  // Información Personal PF
  @Column({ name: 'pf_nombres', nullable: true })
  pf_nombres?: string;

  @Column({ name: 'pf_apellido_p', nullable: true })
  pf_apellido_p?: string;

  @Column({ name: 'pf_apellido_m', nullable: true })
  pf_apellido_m?: string;

  @Column({ name: 'pf_nacionalidad', nullable: true })
  pf_nacionalidad?: string;

  @Column({ name: 'pf_sexo', nullable: true })
  pf_sexo?: string;

  @Column({ name: 'pf_edo_civil', nullable: true })
  pf_edo_civil?: string;

  @Column({ name: 'pf_email', nullable: true })
  pf_email?: string;

  @Column({ name: 'pf_id_tipo', nullable: true })
  pf_id_tipo?: string;

  @Column({ name: 'pf_fecha_nac', type: 'date', nullable: true })
  pf_fecha_nac?: Date;

  @Column({ name: 'pf_rfc', nullable: true })
  pf_rfc?: string;

  @Column({ name: 'pf_curp', nullable: true })
  pf_curp?: string;

  @Column({ name: 'pf_tel_cel', length: 15, nullable: true })
  pf_tel_cel?: string;

  @Column({ name: 'pf_tel_fijo', length: 15, nullable: true })
  pf_tel_fijo?: string;

  // Domicilio Actual PF
  @Column({ name: 'pf_dom_calle', nullable: true })
  pf_dom_calle?: string;

  @Column({ name: 'pf_dom_num_ext', nullable: true })
  pf_dom_num_ext?: string;

  @Column({ name: 'pf_dom_num_int', nullable: true })
  pf_dom_num_int?: string;

  @Column({ name: 'pf_dom_cp', nullable: true })
  pf_dom_cp?: string;

  @Column({ name: 'pf_dom_colonia', nullable: true })
  pf_dom_colonia?: string;

  @Column({ name: 'pf_dom_municipio', nullable: true })
  pf_dom_municipio?: string;

  @Column({ name: 'pf_dom_estado', nullable: true })
  pf_dom_estado?: string;

  @Column({ name: 'pf_sit_hab', nullable: true })
  pf_sit_hab?: string;

  // Datos Arrendador Actual PF
  @Column({ name: 'pf_arr_act_nombre', nullable: true })
  pf_arr_act_nombre?: string;

  @Column({ name: 'pf_arr_act_apellido_p', nullable: true })
  pf_arr_act_apellido_p?: string;

  @Column({ name: 'pf_arr_act_apellido_m', nullable: true })
  pf_arr_act_apellido_m?: string;

  @Column({ name: 'pf_arr_act_tel', nullable: true })
  pf_arr_act_tel?: string;

  @Column({ name: 'pf_arr_act_renta', type: 'decimal', precision: 10, scale: 2, nullable: true })
  pf_arr_act_renta?: number;

  @Column({ name: 'pf_arr_act_ano_ingreso', nullable: true })
  pf_arr_act_ano_ingreso?: number;

  // Empleo e Ingresos PF
  @Column({ name: 'pf_profesion', nullable: true })
  pf_profesion?: string;

  @Column({ name: 'pf_tipo_empleo', nullable: true })
  pf_tipo_empleo?: string;

  @Column({ name: 'pf_tel_empleo', nullable: true })
  pf_tel_empleo?: string;

  @Column({ name: 'pf_ext_empleo', nullable: true })
  pf_ext_empleo?: string;

  @Column({ name: 'pf_nom_empresa', nullable: true })
  pf_nom_empresa?: string;

  @Column({ name: 'pf_calle_empresa', nullable: true })
  pf_calle_empresa?: string;

  @Column({ name: 'pf_num_ext_empresa', nullable: true })
  pf_num_ext_empresa?: string;

  @Column({ name: 'pf_num_int_empresa', nullable: true })
  pf_num_int_empresa?: string;

  @Column({ name: 'pf_cp_empresa', nullable: true })
  pf_cp_empresa?: string;

  @Column({ name: 'pf_col_empresa', nullable: true })
  pf_col_empresa?: string;

  @Column({ name: 'pf_mun_empresa', nullable: true })
  pf_mun_empresa?: string;

  @Column({ name: 'pf_edo_empresa', nullable: true })
  pf_edo_empresa?: string;

  @Column({ name: 'pf_fecha_ing_empleo', type: 'date', nullable: true })
  pf_fecha_ing_empleo?: Date;
  
  // Jefe Inmediato PF
  @Column({ name: 'pf_jefe_nombres', nullable: true })
  pf_jefe_nombres?: string;

  @Column({ name: 'pf_jefe_apellido_p', nullable: true })
  pf_jefe_apellido_p?: string;

  @Column({ name: 'pf_jefe_apellido_m', nullable: true })
  pf_jefe_apellido_m?: string;

  @Column({ name: 'pf_jefe_tel', nullable: true })
  pf_jefe_tel?: string;

  @Column({ name: 'pf_jefe_ext', nullable: true })
  pf_jefe_ext?: string;

  // Ingresos PF
  @Column({ name: 'pf_ing_comprobable', type: 'decimal', precision: 12, scale: 2, nullable: true })
  pf_ing_comprobable?: number;

  @Column({ name: 'pf_ing_no_comprobable', type: 'decimal', precision: 12, scale: 2, nullable: true })
  pf_ing_no_comprobable?: number;

  @Column({ name: 'pf_dependientes', nullable: true })
  pf_dependientes?: number;

  @Column({ name: 'pf_ing_fam_aporta', nullable: true })
  pf_ing_fam_aporta?: boolean;

  // Referencias PF
  @Column({ name: 'pf_ref_p1_nombre', nullable: true })
  pf_ref_p1_nombre?: string;
  @Column({ name: 'pf_ref_p1_relacion', nullable: true })
  pf_ref_p1_relacion?: string;
  @Column({ name: 'pf_ref_p1_tel', nullable: true })
  pf_ref_p1_tel?: string;

  @Column({ name: 'pf_ref_p2_nombre', nullable: true })
  pf_ref_p2_nombre?: string;
  @Column({ name: 'pf_ref_p2_relacion', nullable: true })
  pf_ref_p2_relacion?: string;
  @Column({ name: 'pf_ref_p2_tel', nullable: true })
  pf_ref_p2_tel?: string;

  @Column({ name: 'pf_ref_f1_nombre', nullable: true })
  pf_ref_f1_nombre?: string;
  @Column({ name: 'pf_ref_f1_relacion', nullable: true })
  pf_ref_f1_relacion?: string;
  @Column({ name: 'pf_ref_f1_tel', nullable: true })
  pf_ref_f1_tel?: string;

  @Column({ name: 'pf_ref_f2_nombre', nullable: true })
  pf_ref_f2_nombre?: string;
  @Column({ name: 'pf_ref_f2_relacion', nullable: true })
  pf_ref_f2_relacion?: string;
  @Column({ name: 'pf_ref_f2_tel', nullable: true })
  pf_ref_f2_tel?: string;

  // --- Persona Moral (PM)
  // Información de la empresa PM
  @Column({ name: 'pm_razon_social', nullable: true })
  pm_razon_social?: string;

  @Column({ name: 'pm_email', nullable: true })
  pm_email?: string;
  
  @Column({ name: 'pm_dominio', nullable: true })
  pm_dominio?: string;

  @Column({ name: 'pm_rfc', nullable: true })
  pm_rfc?: string;

  @Column({ name: 'pm_tel', nullable: true })
  pm_tel?: string;

  @Column({ name: 'pm_calle', nullable: true })
  pm_calle?: string;

  @Column({ name: 'pm_num_ext', nullable: true })
  pm_num_ext?: string;

  @Column({ name: 'pm_num_int', nullable: true })
  pm_num_int?: string;

  @Column({ name: 'pm_cp', nullable: true })
  pm_cp?: string;

  @Column({ name: 'pm_colonia', nullable: true })
  pm_colonia?: string;

  @Column({ name: 'pm_municipio', nullable: true })
  pm_municipio?: string;

  @Column({ name: 'pm_estado', nullable: true })
  pm_estado?: string;

  @Column({ name: 'pm_ing_mensual', type: 'decimal', precision: 12, scale: 2, nullable: true })
  pm_ing_mensual?: number;

  @Column({ name: 'pm_ref_ubi', type: 'text', nullable: true })
  pm_ref_ubi?: string;

  // Acta Constitutiva PM
  @Column({ name: 'pm_notario_nombre', nullable: true })
  pm_notario_nombre?: string;
  @Column({ name: 'pm_notario_apellido_p', nullable: true })
  pm_notario_apellido_p?: string;
  @Column({ name: 'pm_notario_apellido_m', nullable: true })
  pm_notario_apellido_m?: string;
  @Column({ name: 'pm_escritura_num', nullable: true })
  pm_escritura_num?: string;
  @Column({ name: 'pm_fecha_const', type: 'date', nullable: true })
  pm_fecha_const?: Date;
  @Column({ name: 'pm_notario_num', nullable: true })
  pm_notario_num?: number;
  @Column({ name: 'pm_ciudad_reg', nullable: true })
  pm_ciudad_reg?: string;
  @Column({ name: 'pm_estado_reg', nullable: true })
  pm_estado_reg?: string;
  @Column({ name: 'pm_reg_num', nullable: true })
  pm_reg_num?: string;

  // Apoderado Legal PM
  @Column({ name: 'pm_apoderado_nombre', nullable: true })
  pm_apoderado_nombre?: string;
  @Column({ name: 'pm_apoderado_apellido_p', nullable: true })
  pm_apoderado_apellido_p?: string;
  @Column({ name: 'pm_apoderado_apellido_m', nullable: true })
  pm_apoderado_apellido_m?: string;
  @Column({ name: 'pm_apoderado_sexo', nullable: true })
  pm_apoderado_sexo?: string;
  @Column({ name: 'pm_apoderado_tel', nullable: true })
  pm_apoderado_tel?: string;
  @Column({ name: 'pm_apoderado_ext', nullable: true })
  pm_apoderado_ext?: string;
  @Column({ name: 'pm_apoderado_email', nullable: true })
  pm_apoderado_email?: string;
  @Column({ name: 'pm_apoderado_facultades', nullable: true })
  pm_apoderado_facultades?: boolean;
  @Column({ name: 'pm_apo_escritura_num', nullable: true })
  pm_apo_escritura_num?: string;
  @Column({ name: 'pm_apo_notario_num', nullable: true })
  pm_apo_notario_num?: number;
  @Column({ name: 'pm_apo_fecha_escritura', type: 'date', nullable: true })
  pm_apo_fecha_escritura?: Date;
  @Column({ name: 'pm_apo_reg_num', nullable: true })
  pm_apo_reg_num?: string;
  @Column({ name: 'pm_apo_ciudad_reg', nullable: true })
  pm_apo_ciudad_reg?: string;
  @Column({ name: 'pm_apo_estado_reg', nullable: true })
  pm_apo_estado_reg?: string;
  @Column({ name: 'pm_apo_tipo_rep', nullable: true })
  pm_apo_tipo_rep?: string;

  // Referencias Comerciales PM
  @Column({ name: 'pm_ref_c1_empresa', nullable: true })
  pm_ref_c1_empresa?: string;
  @Column({ name: 'pm_ref_c1_contacto', nullable: true })
  pm_ref_c1_contacto?: string;
  @Column({ name: 'pm_ref_c1_tel', nullable: true })
  pm_ref_c1_tel?: string;

  @Column({ name: 'pm_ref_c2_empresa', nullable: true })
  pm_ref_c2_empresa?: string;
  @Column({ name: 'pm_ref_c2_contacto', nullable: true })
  pm_ref_c2_contacto?: string;
  @Column({ name: 'pm_ref_c2_tel', nullable: true })
  pm_ref_c2_tel?: string;

  @Column({ name: 'pm_ref_c3_empresa', nullable: true })
  pm_ref_c3_empresa?: string;
  @Column({ name: 'pm_ref_c3_contacto', nullable: true })
  pm_ref_c3_contacto?: string;
  @Column({ name: 'pm_ref_c3_tel', nullable: true })
  pm_ref_c3_tel?: string;

  // --- Campos Comunes (uso de la propiedad)
  @Column({ name: 'prop_tipo_inmueble', nullable: true })
  prop_tipo_inmueble?: string;

  @Column({ name: 'prop_giro_negocio', nullable: true })
  prop_giro_negocio?: string;

  @Column({ name: 'prop_experiencia_giro', nullable: true })
  prop_experiencia_giro?: string;

  @Column({ name: 'prop_proposito', nullable: true })
  prop_proposito?: string;

  @Column({ name: 'prop_reemplaza_dom', type: 'boolean', nullable: true })
  prop_reemplaza_dom?: boolean;

  @Column({ name: 'prop_dom_ant_calle', nullable: true })
  prop_dom_ant_calle?: string;
  @Column({ name: 'prop_dom_ant_num_ext', nullable: true })
  prop_dom_ant_num_ext?: string;
  @Column({ name: 'prop_dom_ant_num_int', nullable: true })
  prop_dom_ant_num_int?: string;
  @Column({ name: 'prop_dom_ant_cp', nullable: true })
  prop_dom_ant_cp?: string;
  @Column({ name: 'prop_dom_ant_colonia', nullable: true })
  prop_dom_ant_colonia?: string;
  @Column({ name: 'prop_dom_ant_municipio', nullable: true })
  prop_dom_ant_municipio?: string;
  @Column({ name: 'prop_dom_ant_estado', nullable: true })
  prop_dom_ant_estado?: string;

  @Column({ name: 'prop_motivo_cambio', nullable: true })
  prop_motivo_cambio?: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}