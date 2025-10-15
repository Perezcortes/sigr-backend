// src/rentals/entities/tenant.entity.ts
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToOne, 
    JoinColumn, 
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn, 
} from 'typeorm';
import { PersonaFisica } from './tenant-pf.entity';
import { PersonaMoral } from './tenant-pm.entity';
import { UsoPropiedad } from './use-property.entity';

@Entity('inquilinos')
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_persona' })
  tipo_persona: 'PF' | 'PM';

  @Column({ name: 'email', nullable: true })
  email?: string;
  
  @Column({ name: 'rfc', nullable: true })
  rfc?: string;

  @Column({ name: 'tel_cel', nullable: true })
  tel_cel?: string;

  @Column({ name: 'tel_fijo', nullable: true })
  tel_fijo?: string;
  
  @Column({ name: 'id_tipo', nullable: true })
  id_tipo?: string;

  @Column({ name: 'dom_calle', nullable: true })
  dom_calle?: string;
  
  @Column({ name: 'dom_num_ext', nullable: true })
  dom_num_ext?: string;

  @Column({ name: 'dom_num_int', nullable: true })
  dom_num_int?: string;
  
  @Column({ name: 'dom_cp', nullable: true })
  dom_cp?: string;
  
  @Column({ name: 'dom_colonia', nullable: true })
  dom_colonia?: string;
  
  @Column({ name: 'dom_municipio', nullable: true })
  dom_municipio?: string;
  
  @Column({ name: 'dom_estado', nullable: true })
  dom_estado?: string;

  @Column({ name: 'sit_hab', nullable: true })
  sit_hab?: string;
  
  @Column({ name: 'arr_act_nombre', nullable: true })
  arr_act_nombre?: string;
  
  @Column({ name: 'arr_act_apellido_p', nullable: true })
  arr_act_apellido_p?: string;
  
  @Column({ name: 'arr_act_apellido_m', nullable: true })
  arr_act_apellido_m?: string;
  
  @Column({ name: 'arr_act_tel', nullable: true })
  arr_act_tel?: string;
  
  @Column({ name: 'arr_act_renta', type: 'decimal', precision: 10, scale: 2, nullable: true })
  arr_act_renta?: number;
  
  @Column({ name: 'arr_act_ano', nullable: true })
  arr_act_ano?: number;

  // Relación con la entidad de Persona Física
  @OneToOne(() => PersonaFisica, pf => pf.inquilino, { nullable: true, cascade: true })
  @JoinColumn({ name: 'pf_id' })
  pf?: PersonaFisica;

  // Relación con la entidad de Persona Moral
  @OneToOne(() => PersonaMoral, pm => pm.inquilino, { nullable: true, cascade: true })
  @JoinColumn({ name: 'pm_id' })
  pm?: PersonaMoral;
  
  // Relación con la entidad de Uso de Propiedad
  @OneToOne(() => UsoPropiedad, uso => uso.inquilino, { nullable: true, cascade: true })
  @JoinColumn({ name: 'uso_propiedad_id' })
  uso_propiedad?: UsoPropiedad;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}