// src/rentals/entities/uso-propiedad.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity('uso_propiedad')
export class UsoPropiedad {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ name: 'tipo_inmueble', nullable: true })
  tipo_inmueble?: string;

  @Column({ name: 'giro_negocio', nullable: true })
  giro_negocio?: string;

  @Column({ name: 'experiencia_giro', nullable: true })
  experiencia_giro?: string;

  @Column({ name: 'proposito_arrendamiento', nullable: true })
  proposito_arrendamiento?: string;
  
  @Column({ name: 'reemplaza_domicilio', type: 'boolean', nullable: true })
  reemplaza_domicilio?: boolean;

  @Column({ name: 'ant_calle', nullable: true })
  ant_calle?: string;
  
  @Column({ name: 'ant_num_ext', nullable: true })
  ant_num_ext?: string;
  
  @Column({ name: 'ant_num_int', nullable: true })
  ant_num_int?: string;
  
  @Column({ name: 'ant_cp', nullable: true })
  ant_cp?: string;
  
  @Column({ name: 'ant_colonia', nullable: true })
  ant_colonia?: string;
  
  @Column({ name: 'ant_municipio', nullable: true })
  ant_municipio?: string;
  
  @Column({ name: 'ant_estado', nullable: true })
  ant_estado?: string;
  
  @Column({ name: 'motivo_cambio', nullable: true })
  motivo_cambio?: string;

  @OneToOne(() => Tenant, inquilino => inquilino.uso_propiedad)
  inquilino: Tenant;
}