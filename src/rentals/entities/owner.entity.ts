// src/rentals/entities/owner.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('propietarios')
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_persona' })
  tipo_persona: 'fisica' | 'moral';

  // --- Persona Física (PF)
  // Información personal PF
  @Column({ name: 'pf_nombres', nullable: true })
  pf_nombres?: string;

  @Column({ name: 'pf_apellido_p', nullable: true })
  pf_apellido_p?: string;

  @Column({ name: 'pf_apellido_m', nullable: true })
  pf_apellido_m?: string;

  @Column({ name: 'pf_curp', nullable: true })
  pf_curp?: string;

  @Column({ name: 'pf_email', nullable: true })
  pf_email?: string;

  @Column({ name: 'pf_tel', length: 15, nullable: true })
  pf_tel?: string;

  @Column({ name: 'pf_edo_civil', nullable: true })
  pf_edo_civil?: string;

  @Column({ name: 'pf_regimen_mat', nullable: true })
  pf_regimen_mat?: string;

  @Column({ name: 'pf_sexo', nullable: true })
  pf_sexo?: string;

  @Column({ name: 'pf_nacionalidad', nullable: true })
  pf_nacionalidad?: string;

  @Column({ name: 'pf_id_tipo', nullable: true })
  pf_id_tipo?: string;

  @Column({ name: 'pf_rfc', nullable: true })
  pf_rfc?: string;

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

  @Column({ name: 'pf_dom_ref', type: 'text', nullable: true })
  pf_dom_ref?: string;

  // Datos de pago de renta
  @Column({ name: 'pf_forma_pago_renta', nullable: true })
  pf_forma_pago_renta?: string;

  @Column({ name: 'pf_pago_otro_metodo', nullable: true })
  pf_pago_otro_metodo?: string;

  // Datos de transferencia (si aplica)
  @Column({ name: 'pf_titular_cuenta', nullable: true })
  pf_titular_cuenta?: string;
  
  @Column({ name: 'pf_num_cuenta', nullable: true })
  pf_num_cuenta?: string;

  @Column({ name: 'pf_nombre_banco', nullable: true })
  pf_nombre_banco?: string;

  @Column({ name: 'pf_clabe_interbancaria', nullable: true })
  pf_clabe_interbancaria?: string;

  // Datos del inmueble a arrendar
  @Column({ name: 'pf_prop_tipo_inmueble', nullable: true })
  pf_prop_tipo_inmueble?: string;

  @Column({ name: 'pf_prop_uso_suelo', nullable: true })
  pf_prop_uso_suelo?: string;

  @Column({ name: 'pf_prop_mascotas', nullable: true })
  pf_prop_mascotas?: string;
  
  @Column({ name: 'pf_prop_mascotas_especif', nullable: true })
  pf_prop_mascotas_especif?: string;

  @Column({ name: 'pf_prop_precio_renta', type: 'decimal', precision: 12, scale: 2, nullable: true })
  pf_prop_precio_renta?: number;

  @Column({ name: 'pf_prop_iva', nullable: true })
  pf_prop_iva?: string;

  @Column({ name: 'pf_prop_frec_pago', nullable: true })
  pf_prop_frec_pago?: string;

  @Column({ name: 'pf_prop_frec_pago_otra', nullable: true })
  pf_prop_frec_pago_otra?: string;

  @Column({ name: 'pf_prop_condiciones_pago', type: 'text', nullable: true })
  pf_prop_condiciones_pago?: string;

  @Column({ name: 'pf_prop_deposito_garantia', type: 'decimal', precision: 12, scale: 2, nullable: true })
  pf_prop_deposito_garantia?: number;

  @Column({ name: 'pf_prop_paga_mantenimiento', nullable: true })
  pf_prop_paga_mantenimiento?: string; // 'Sí' o 'No'

  @Column({ name: 'pf_prop_quien_paga_mantenimiento', nullable: true })
  pf_prop_quien_paga_mantenimiento?: string; // 'Arrendatario' o 'Arrendador'

  @Column({ name: 'pf_prop_mantenimiento_incluido', nullable: true })
  pf_prop_mantenimiento_incluido?: string; // 'Sí' o 'No'
  
  @Column({ name: 'pf_prop_costo_mantenimiento', type: 'decimal', precision: 12, scale: 2, nullable: true })
  pf_prop_costo_mantenimiento?: number;

  @Column({ name: 'pf_prop_instrucciones_pago', type: 'text', nullable: true })
  pf_prop_instrucciones_pago?: string;

  @Column({ name: 'pf_prop_requiere_seguro', nullable: true })
  pf_prop_requiere_seguro?: string;

  @Column({ name: 'pf_prop_cobertura_seguro', nullable: true })
  pf_prop_cobertura_seguro?: string;

  @Column({ name: 'pf_prop_monto_seguro', type: 'decimal', precision: 12, scale: 2, nullable: true })
  pf_prop_monto_seguro?: number;

  @Column({ name: 'pf_prop_servicios_pago', type: 'text', nullable: true })
  pf_prop_servicios_pago?: string;

  // Dirección del inmueble
  @Column({ name: 'pf_prop_calle', nullable: true })
  pf_prop_calle?: string;
  
  @Column({ name: 'pf_prop_num_ext', nullable: true })
  pf_prop_num_ext?: string;

  @Column({ name: 'pf_prop_num_int', nullable: true })
  pf_prop_num_int?: string;

  @Column({ name: 'pf_prop_cp', nullable: true })
  pf_prop_cp?: string;

  @Column({ name: 'pf_prop_colonia', nullable: true })
  pf_prop_colonia?: string;

  @Column({ name: 'pf_prop_municipio', nullable: true })
  pf_prop_municipio?: string;

  @Column({ name: 'pf_prop_estado', nullable: true })
  pf_prop_estado?: string;

  @Column({ name: 'pf_prop_ref', type: 'text', nullable: true })
  pf_prop_ref?: string;
  
  @Column({ name: 'pf_prop_inventario', type: 'text', nullable: true })
  pf_prop_inventario?: string;

  // Representación del propietario (si aplica)
  @Column({ name: 'pf_representado', nullable: true })
  pf_representado?: boolean;

  @Column({ name: 'pf_rep_tipo_rep', nullable: true })
  pf_rep_tipo_rep?: string;

  @Column({ name: 'pf_rep_nombres', nullable: true })
  pf_rep_nombres?: string;

  @Column({ name: 'pf_rep_apellido_p', nullable: true })
  pf_rep_apellido_p?: string;

  @Column({ name: 'pf_rep_apellido_m', nullable: true })
  pf_rep_apellido_m?: string;

  @Column({ name: 'pf_rep_sexo', nullable: true })
  pf_rep_sexo?: string;

  @Column({ name: 'pf_rep_curp', nullable: true })
  pf_rep_curp?: string;

  @Column({ name: 'pf_rep_id_tipo', nullable: true })
  pf_rep_id_tipo?: string;

  @Column({ name: 'pf_rep_rfc', nullable: true })
  pf_rep_rfc?: string;

  @Column({ name: 'pf_rep_tel', length: 15, nullable: true })
  pf_rep_tel?: string;

  @Column({ name: 'pf_rep_email', nullable: true })
  pf_rep_email?: string;
  
  @Column({ name: 'pf_rep_dom_calle', nullable: true })
  pf_rep_dom_calle?: string;
  
  @Column({ name: 'pf_rep_dom_num_ext', nullable: true })
  pf_rep_dom_num_ext?: string;
  
  @Column({ name: 'pf_rep_dom_num_int', nullable: true })
  pf_rep_dom_num_int?: string;
  
  @Column({ name: 'pf_rep_dom_cp', nullable: true })
  pf_rep_dom_cp?: string;
  
  @Column({ name: 'pf_rep_dom_colonia', nullable: true })
  pf_rep_dom_colonia?: string;
  
  @Column({ name: 'pf_rep_dom_municipio', nullable: true })
  pf_rep_dom_municipio?: string;
  
  @Column({ name: 'pf_rep_dom_estado', nullable: true })
  pf_rep_dom_estado?: string;

  // --- Persona Moral (PM)
  // Información de la empresa
  @Column({ name: 'pm_razon_social', nullable: true })
  pm_razon_social?: string;

  @Column({ name: 'pm_rfc', nullable: true })
  pm_rfc?: string;

  @Column({ name: 'pm_email', nullable: true })
  pm_email?: string;

  @Column({ name: 'pm_tel', length: 15, nullable: true })
  pm_tel?: string;

  @Column({ name: 'pm_antiguedad_empresa', nullable: true })
  pm_antiguedad_empresa?: string;
  
  @Column({ name: 'pm_ing_mensual', type: 'decimal', precision: 12, scale: 2, nullable: true })
  pm_ing_mensual?: number;
  
  @Column({ name: 'pm_actividades_empresa', type: 'text', nullable: true })
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

  // Datos del acta constitutiva
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

  // Representación del propietario (si aplica)
  @Column({ name: 'pm_representado', nullable: true })
  pm_representado?: boolean;

  @Column({ name: 'pm_rep_tipo_rep', nullable: true })
  pm_rep_tipo_rep?: string;

  @Column({ name: 'pm_rep_nombres', nullable: true })
  pm_rep_nombres?: string;

  @Column({ name: 'pm_rep_apellido_p', nullable: true })
  pm_rep_apellido_p?: string;

  @Column({ name: 'pm_rep_apellido_m', nullable: true })
  pm_rep_apellido_m?: string;

  @Column({ name: 'pm_rep_sexo', nullable: true })
  pm_rep_sexo?: string;

  @Column({ name: 'pm_rep_curp', nullable: true })
  pm_rep_curp?: string;

  @Column({ name: 'pm_rep_id_tipo', nullable: true })
  pm_rep_id_tipo?: string;

  @Column({ name: 'pm_rep_rfc', nullable: true })
  pm_rep_rfc?: string;

  @Column({ name: 'pm_rep_tel', length: 15, nullable: true })
  pm_rep_tel?: string;

  @Column({ name: 'pm_rep_email', nullable: true })
  pm_rep_email?: string;

  @Column({ name: 'pm_rep_dom_calle', nullable: true })
  pm_rep_dom_calle?: string;
  
  @Column({ name: 'pm_rep_dom_num_ext', nullable: true })
  pm_rep_dom_num_ext?: string;

  @Column({ name: 'pm_rep_dom_num_int', nullable: true })
  pm_rep_dom_num_int?: string;
  
  @Column({ name: 'pm_rep_dom_cp', nullable: true })
  pm_rep_dom_cp?: string;
  
  @Column({ name: 'pm_rep_dom_colonia', nullable: true })
  pm_rep_dom_colonia?: string;
  
  @Column({ name: 'pm_rep_dom_municipio', nullable: true })
  pm_rep_dom_municipio?: string;
  
  @Column({ name: 'pm_rep_dom_estado', nullable: true })
  pm_rep_dom_estado?: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}