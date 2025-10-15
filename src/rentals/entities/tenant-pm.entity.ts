// src/rentals/entities/persona-moral.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity('pm_datos')
export class PersonaMoral {
  @PrimaryGeneratedColumn()
  id: number;
  
  // Información de la empresa
  @Column({ name: 'razon_social', nullable: true })
  razon_social?: string;

  @Column({ name: 'dominio', nullable: true })
  dominio?: string;

  @Column({ name: 'ing_mensual', type: 'decimal', precision: 12, scale: 2, nullable: true })
  ing_mensual?: number;
  
  @Column({ name: 'ref_ubi', type: 'text', nullable: true })
  ref_ubi?: string;

  // Acta Constitutiva
  @Column({ name: 'notario_nombre', nullable: true })
  notario_nombre?: string;
  @Column({ name: 'notario_apellido_p', nullable: true })
  notario_apellido_p?: string;
  @Column({ name: 'notario_apellido_m', nullable: true })
  notario_apellido_m?: string;
  @Column({ name: 'escritura_num', nullable: true })
  escritura_num?: string;
  @Column({ name: 'fecha_const', type: 'date', nullable: true })
  fecha_const?: Date;
  @Column({ name: 'notario_num', nullable: true })
  notario_num?: number;
  @Column({ name: 'ciudad_reg', nullable: true })
  ciudad_reg?: string;
  @Column({ name: 'estado_reg', nullable: true })
  estado_reg?: string;
  @Column({ name: 'reg_num', nullable: true })
  reg_num?: string;

  // Apoderado Legal
  @Column({ name: 'apoderado_nombre', nullable: true })
  apoderado_nombre?: string;
  @Column({ name: 'apoderado_apellido_p', nullable: true })
  apoderado_apellido_p?: string;
  @Column({ name: 'apoderado_apellido_m', nullable: true })
  apoderado_apellido_m?: string;
  @Column({ name: 'apoderado_sexo', nullable: true })
  apoderado_sexo?: string;
  @Column({ name: 'apoderado_tel', nullable: true })
  apoderado_tel?: string;
  @Column({ name: 'apoderado_ext', nullable: true })
  apoderado_ext?: string;
  @Column({ name: 'apoderado_email', nullable: true })
  apoderado_email?: string;
  @Column({ name: 'apoderado_facultades', nullable: true })
  apoderado_facultades?: boolean;
  @Column({ name: 'apo_escritura_num', nullable: true })
  apo_escritura_num?: string;
  @Column({ name: 'apo_notario_num', nullable: true })
  apo_notario_num?: number;
  @Column({ name: 'apo_fecha_escritura', type: 'date', nullable: true })
  apo_fecha_escritura?: Date;
  @Column({ name: 'apo_reg_num', nullable: true })
  apo_reg_num?: string;
  @Column({ name: 'apo_ciudad_reg', nullable: true })
  apo_ciudad_reg?: string;
  @Column({ name: 'apo_estado_reg', nullable: true })
  apo_estado_reg?: string;
  @Column({ name: 'apo_tipo_rep', nullable: true })
  apo_tipo_rep?: string;
  
  // Referencias Comerciales
  @Column({ name: 'ref_c1_empresa', nullable: true })
  ref_c1_empresa?: string;
  @Column({ name: 'ref_c1_contacto', nullable: true })
  ref_c1_contacto?: string;
  @Column({ name: 'ref_c1_tel', nullable: true })
  ref_c1_tel?: string;
  
  @Column({ name: 'ref_c2_empresa', nullable: true })
  ref_c2_empresa?: string;
  @Column({ name: 'ref_c2_contacto', nullable: true })
  ref_c2_contacto?: string;
  @Column({ name: 'ref_c2_tel', nullable: true })
  ref_c2_tel?: string;
  
  @Column({ name: 'ref_c3_empresa', nullable: true })
  ref_c3_empresa?: string;
  @Column({ name: 'ref_c3_contacto', nullable: true })
  ref_c3_contacto?: string;
  @Column({ name: 'ref_c3_tel', nullable: true })
  ref_c3_tel?: string;

  // Relación con Tenant
  @OneToOne(() => Tenant, inquilino => inquilino.pm)
  inquilino: Tenant;
}