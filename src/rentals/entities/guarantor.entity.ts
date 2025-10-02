// src/rentals/entities/guarantor.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('obligados_solidarios')
export class Guarantor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_persona' })
  tipo_persona: 'PF' | 'PM';

  // --- Persona Física (PF)
  // Información personal
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
  @Column({ name: 'pf_relacion_inquilino', nullable: true })
  pf_relacion_inquilino?: string;
  @Column({ name: 'pf_tiempo_conocerlo', nullable: true })
  pf_tiempo_conocerlo?: string;

  // Domicilio actual PF
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

  // Empleo e Ingresos PF
  @Column({ name: 'pf_nom_empresa', nullable: true })
  pf_nom_empresa?: string;
  @Column({ name: 'pf_fecha_ing_empleo', type: 'date', nullable: true })
  pf_fecha_ing_empleo?: Date;
  @Column({ name: 'pf_profesion', nullable: true })
  pf_profesion?: string;
  @Column({ name: 'pf_tipo_empleo', nullable: true })
  pf_tipo_empleo?: string;
  @Column({ name: 'pf_ing_mensual', type: 'decimal', precision: 12, scale: 2, nullable: true })
  pf_ing_mensual?: number;

  // Ubicación de la empresa PF
  @Column({ name: 'pf_empresa_calle', nullable: true })
  pf_empresa_calle?: string;
  @Column({ name: 'pf_empresa_num_ext', nullable: true })
  pf_empresa_num_ext?: string;
  @Column({ name: 'pf_empresa_num_int', nullable: true })
  pf_empresa_num_int?: string;
  @Column({ name: 'pf_empresa_cp', nullable: true })
  pf_empresa_cp?: string;
  @Column({ name: 'pf_empresa_colonia', nullable: true })
  pf_empresa_colonia?: string;
  @Column({ name: 'pf_empresa_municipio', nullable: true })
  pf_empresa_municipio?: string;
  @Column({ name: 'pf_empresa_estado', nullable: true })
  pf_empresa_estado?: string;
  @Column({ name: 'pf_empresa_tel', nullable: true })
  pf_empresa_tel?: string;
  @Column({ name: 'pf_empresa_ext', nullable: true })
  pf_empresa_ext?: string;

  // Propiedad en garantía PF (si aplica)
  @Column({ name: 'pf_prop_garantia_calle', nullable: true })
  pf_prop_garantia_calle?: string;
  @Column({ name: 'pf_prop_garantia_num_ext', nullable: true })
  pf_prop_garantia_num_ext?: string;
  @Column({ name: 'pf_prop_garantia_num_int', nullable: true })
  pf_prop_garantia_num_int?: string;
  @Column({ name: 'pf_prop_garantia_cp', nullable: true })
  pf_prop_garantia_cp?: string;
  @Column({ name: 'pf_prop_garantia_colonia', nullable: true })
  pf_prop_garantia_colonia?: string;
  @Column({ name: 'pf_prop_garantia_municipio', nullable: true })
  pf_prop_garantia_municipio?: string;
  @Column({ name: 'pf_prop_garantia_estado', nullable: true })
  pf_prop_garantia_estado?: string;
  @Column({ name: 'pf_escritura_num', nullable: true })
  pf_escritura_num?: string;
  @Column({ name: 'pf_fecha_escritura', type: 'date', nullable: true })
  pf_fecha_escritura?: Date;
  @Column({ name: 'pf_notario_nombre', nullable: true })
  pf_notario_nombre?: string;
  @Column({ name: 'pf_notario_apellido_p', nullable: true })
  pf_notario_apellido_p?: string;
  @Column({ name: 'pf_notario_apellido_m', nullable: true })
  pf_notario_apellido_m?: string;
  @Column({ name: 'pf_notaria_num', nullable: true })
  pf_notaria_num?: number;
  @Column({ name: 'pf_notaria_lugar', nullable: true })
  pf_notaria_lugar?: string;
  @Column({ name: 'pf_reg_pub_prop', nullable: true })
  pf_reg_pub_prop?: string;
  @Column({ name: 'pf_folio_real_elec', nullable: true })
  pf_folio_real_elec?: string;
  @Column({ name: 'pf_fecha_reg_prop', type: 'date', nullable: true })
  pf_fecha_reg_prop?: Date;
  @Column({ name: 'pf_boleta_predial_num', nullable: true })
  pf_boleta_predial_num?: string;

  // --- Persona Moral (PM)
  // Información de la empresa
  @Column({ name: 'pm_razon_social', nullable: true })
  pm_razon_social?: string;
  @Column({ name: 'pm_rfc', nullable: true })
  pm_rfc?: string;
  @Column({ name: 'pm_email', nullable: true })
  pm_email?: string;
  @Column({ name: 'pm_tel', nullable: true })
  pm_tel?: string;
  @Column({ name: 'pm_antiguedad_empresa', nullable: true })
  pm_antiguedad_empresa?: string;
  @Column({ name: 'pm_ing_mensual', type: 'decimal', precision: 12, scale: 2, nullable: true })
  pm_ing_mensual?: number;
  @Column({ name: 'pm_actividades_empresa', nullable: true })
  pm_actividades_empresa?: string;

  // Domicilio de la empresa PM
  @Column({ name: 'pm_dom_calle', nullable: true })
  pm_dom_calle?: string;
  @Column({ name: 'pm_dom_num_ext', nullable: true })
  pm_dom_num_ext?: string;
  @Column({ name: 'pm_dom_num_int', nullable: true })
  pm_dom_num_int?: string;
  @Column({ name: 'pm_dom_cp', nullable: true })
  pm_dom_cp?: string;
  @Column({ name: 'pm_dom_colonia', nullable: true })
  pm_dom_colonia?: string;
  @Column({ name: 'pm_dom_municipio', nullable: true })
  pm_dom_municipio?: string;
  @Column({ name: 'pm_dom_estado', nullable: true })
  pm_dom_estado?: string;

  // Acta constitutiva PM
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
  @Column({ name: 'pm_giro_comercial', nullable: true })
  pm_giro_comercial?: string;

  // Representante Legal PM
  @Column({ name: 'pm_apoderado_nombre', nullable: true })
  pm_apoderado_nombre?: string;
  @Column({ name: 'pm_apoderado_apellido_p', nullable: true })
  pm_apoderado_apellido_p?: string;
  @Column({ name: 'pm_apoderado_apellido_m', nullable: true })
  pm_apoderado_apellido_m?: string;
  @Column({ name: 'pm_apoderado_sexo', nullable: true })
  pm_apoderado_sexo?: string;
  @Column({ name: 'pm_apoderado_rfc', nullable: true })
  pm_apoderado_rfc?: string;
  @Column({ name: 'pm_apoderado_curp', nullable: true })
  pm_apoderado_curp?: string;
  @Column({ name: 'pm_apoderado_email', nullable: true })
  pm_apoderado_email?: string;
  @Column({ name: 'pm_apoderado_tel', nullable: true })
  pm_apoderado_tel?: string;

  // Domicilio del Representante Legal PM
  @Column({ name: 'pm_dom_rep_calle', nullable: true })
  pm_dom_rep_calle?: string;
  @Column({ name: 'pm_dom_rep_num_ext', nullable: true })
  pm_dom_rep_num_ext?: string;
  @Column({ name: 'pm_dom_rep_num_int', nullable: true })
  pm_dom_rep_num_int?: string;
  @Column({ name: 'pm_dom_rep_cp', nullable: true })
  pm_dom_rep_cp?: string;
  @Column({ name: 'pm_dom_rep_colonia', nullable: true })
  pm_dom_rep_colonia?: string;
  @Column({ name: 'pm_dom_rep_municipio', nullable: true })
  pm_dom_rep_municipio?: string;
  @Column({ name: 'pm_dom_rep_estado', nullable: true })
  pm_dom_rep_estado?: string;

  // Facultades del Apoderado PM
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
  @Column({ name: 'pm_apo_fecha_reg', type: 'date', nullable: true })
  pm_apo_fecha_reg?: Date;
  @Column({ name: 'pm_apo_ciudad_reg', nullable: true })
  pm_apo_ciudad_reg?: string;
  @Column({ name: 'pm_apo_estado_reg', nullable: true })
  pm_apo_estado_reg?: string;
  @Column({ name: 'pm_apo_tipo_rep', nullable: true })
  pm_apo_tipo_rep?: string;

  // Propiedad en garantía PM (campos corregidos)
  @Column({ name: 'pm_prop_garantia_escritura_num', nullable: true })
  pm_prop_garantia_escritura_num?: string;
  @Column({ name: 'pm_prop_garantia_fecha_escritura', type: 'date', nullable: true })
  pm_prop_garantia_fecha_escritura?: Date;
  @Column({ name: 'pm_prop_garantia_notario_nombre', nullable: true })
  pm_prop_garantia_notario_nombre?: string;
  @Column({ name: 'pm_prop_garantia_notario_apellido_p', nullable: true })
  pm_prop_garantia_notario_apellido_p?: string;
  @Column({ name: 'pm_prop_garantia_notario_apellido_m', nullable: true })
  pm_prop_garantia_notario_apellido_m?: string;
  @Column({ name: 'pm_prop_garantia_notaria_num', nullable: true })
  pm_prop_garantia_notaria_num?: number;
  @Column({ name: 'pm_prop_garantia_notaria_lugar', nullable: true })
  pm_prop_garantia_notaria_lugar?: string;
  @Column({ name: 'pm_prop_garantia_reg_pub_prop', nullable: true })
  pm_prop_garantia_reg_pub_prop?: string;
  @Column({ name: 'pm_prop_garantia_folio_real_elec', nullable: true })
  pm_prop_garantia_folio_real_elec?: string;
  @Column({ name: 'pm_prop_garantia_fecha_reg_prop', type: 'date', nullable: true })
  pm_prop_garantia_fecha_reg_prop?: Date;
  @Column({ name: 'pm_prop_garantia_boleta_predial_num', nullable: true })
  pm_prop_garantia_boleta_predial_num?: string;
  
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}