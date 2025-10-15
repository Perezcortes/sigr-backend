// src/rentals/entities/persona-fisica.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity('pf_datos')
export class PersonaFisica {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ name: 'nombres', nullable: true })
  nombres?: string;

  @Column({ name: 'apellido_p', nullable: true })
  apellido_p?: string;
  
  @Column({ name: 'apellido_m', nullable: true })
  apellido_m?: string;

  @Column({ name: 'nacionalidad', nullable: true })
  nacionalidad?: string;

  @Column({ name: 'sexo', nullable: true })
  sexo?: string;
  
  @Column({ name: 'edo_civil', nullable: true })
  edo_civil?: string;
  
  @Column({ name: 'fecha_nac', type: 'date', nullable: true })
  fecha_nac?: Date;
  
  @Column({ name: 'curp', nullable: true })
  curp?: string;
  
  @Column({ name: 'datos_conyuge', nullable: true })
  datos_conyuge?: string;
  
  // Empleo e Ingresos
  @Column({ name: 'profesion', nullable: true })
  profesion?: string;
  
  @Column({ name: 'tipo_empleo', nullable: true })
  tipo_empleo?: string;
  
  @Column({ name: 'nom_empresa', nullable: true })
  nom_empresa?: string;
  
  @Column({ name: 'tel_empleo', nullable: true })
  tel_empleo?: string;
  
  @Column({ name: 'ext_empleo', nullable: true })
  ext_empleo?: string;
  
  @Column({ name: 'calle_empresa', nullable: true })
  calle_empresa?: string;
  
  @Column({ name: 'num_ext_empresa', nullable: true })
  num_ext_empresa?: string;
  
  @Column({ name: 'num_int_empresa', nullable: true })
  num_int_empresa?: string;
  
  @Column({ name: 'cp_empresa', nullable: true })
  cp_empresa?: string;
  
  @Column({ name: 'col_empresa', nullable: true })
  col_empresa?: string;
  
  @Column({ name: 'mun_empresa', nullable: true })
  mun_empresa?: string;
  
  @Column({ name: 'edo_empresa', nullable: true })
  edo_empresa?: string;
  
  @Column({ name: 'fecha_ing_empleo', type: 'date', nullable: true })
  fecha_ing_empleo?: Date;
  
  @Column({ name: 'ing_comprobable', type: 'decimal', precision: 12, scale: 2, nullable: true })
  ing_comprobable?: number;
  
  @Column({ name: 'ing_no_comprobable', type: 'decimal', precision: 12, scale: 2, nullable: true })
  ing_no_comprobable?: number;
  
  @Column({ name: 'dependientes', nullable: true })
  dependientes?: number;
  
  @Column({ name: 'ing_fam_aporta', nullable: true })
  ing_fam_aporta?: boolean;
  
  // Quien aporta al ingreso familiar
  @Column({ name: 'num_aportan', nullable: true })
  num_aportan?: number;
  
  @Column({ name: 'aportante_nombre', nullable: true })
  aportante_nombre?: string;
  
  @Column({ name: 'aportante_apellido_p', nullable: true })
  aportante_apellido_p?: string;
  
  @Column({ name: 'aportante_apellido_m', nullable: true })
  aportante_apellido_m?: string;
  
  @Column({ name: 'aportante_parentesco', nullable: true })
  aportante_parentesco?: string;
  
  @Column({ name: 'aportante_telefono', nullable: true })
  aportante_telefono?: string;
  
  @Column({ name: 'aportante_empresa', nullable: true })
  aportante_empresa?: string;
  
  @Column({ name: 'aportante_ingreso', type: 'decimal', precision: 12, scale: 2, nullable: true })
  aportante_ingreso?: number;
  
  // Referencias Personales y Familiares
  @Column({ name: 'ref_per1_nombre', nullable: true })
  ref_per1_nombre?: string;
  @Column({ name: 'ref_per1_apellido_p', nullable: true })
  ref_per1_apellido_p?: string;
  @Column({ name: 'ref_per1_apellido_m', nullable: true })
  ref_per1_apellido_m?: string;
  @Column({ name: 'ref_per1_relacion', nullable: true })
  ref_per1_relacion?: string;
  @Column({ name: 'ref_per1_telefono', nullable: true })
  ref_per1_telefono?: string;
  
  @Column({ name: 'ref_per2_nombre', nullable: true })
  ref_per2_nombre?: string;
  @Column({ name: 'ref_per2_apellido_p', nullable: true })
  ref_per2_apellido_p?: string;
  @Column({ name: 'ref_per2_apellido_m', nullable: true })
  ref_per2_apellido_m?: string;
  @Column({ name: 'ref_per2_relacion', nullable: true })
  ref_per2_relacion?: string;
  @Column({ name: 'ref_per2_telefono', nullable: true })
  ref_per2_telefono?: string;
  
  @Column({ name: 'ref_fam1_nombre', nullable: true })
  ref_fam1_nombre?: string;
  @Column({ name: 'ref_fam1_apellido_p', nullable: true })
  ref_fam1_apellido_p?: string;
  @Column({ name: 'ref_fam1_apellido_m', nullable: true })
  ref_fam1_apellido_m?: string;
  @Column({ name: 'ref_fam1_relacion', nullable: true })
  ref_fam1_relacion?: string;
  @Column({ name: 'ref_fam1_telefono', nullable: true })
  ref_fam1_telefono?: string;
  
  @Column({ name: 'ref_fam2_nombre', nullable: true })
  ref_fam2_nombre?: string;
  @Column({ name: 'ref_fam2_apellido_p', nullable: true })
  ref_fam2_apellido_p?: string;
  @Column({ name: 'ref_fam2_apellido_m', nullable: true })
  ref_fam2_apellido_m?: string;
  @Column({ name: 'ref_fam2_relacion', nullable: true })
  ref_fam2_relacion?: string;
  @Column({ name: 'ref_fam2_telefono', nullable: true })
  ref_fam2_telefono?: string;
  
  // Relación con Tenant
  @OneToOne(() => Tenant, inquilino => inquilino.pf)
  inquilino: Tenant;
}