// src/rentals/entities/guarantor-property-guarantee.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Guarantor } from './guarantor.entity';

@Entity('guarantor_property_guarantee')
export class GuarantorPropertyGuarantee {
  @PrimaryGeneratedColumn()
  id: number;

  // Domicilio de la propiedad
  @Column({ name: 'calle', nullable: true })
  calle?: string;
  @Column({ name: 'num_ext', nullable: true })
  num_ext?: string;
  @Column({ name: 'num_int', nullable: true })
  num_int?: string;
  @Column({ name: 'cp', nullable: true })
  cp?: string;
  @Column({ name: 'colonia', nullable: true })
  colonia?: string;
  @Column({ name: 'del_mun', nullable: true })
  del_mun?: string;
  @Column({ name: 'estado', nullable: true })
  estado?: string;

  // Datos de la escritura
  @Column({ name: 'num_escritura', nullable: true })
  num_escritura?: string;
  @Column({ name: 'notario_nombre', nullable: true })
  notario_nombre?: string;
  @Column({ name: 'notario_apellido_p', nullable: true })
  notario_apellido_p?: string;
  @Column({ name: 'notario_apellido_m', nullable: true })
  notario_apellido_m?: string;
  @Column({ name: 'num_notaria', nullable: true })
  num_notaria?: number;
  @Column({ name: 'fecha_escritura', type: 'date', nullable: true })
  fecha_escritura?: Date;
  @Column({ name: 'lugar_notaria', nullable: true })
  lugar_notaria?: string;

  // Registro Público de Propiedad
  @Column({ name: 'reg_pub_propiedad', nullable: true })
  reg_pub_propiedad?: string;
  @Column({ name: 'no_boleta_predial', nullable: true })
  no_boleta_predial?: string;
  @Column({ name: 'folio_real_elec', nullable: true })
  folio_real_elec?: string;
  @Column({ name: 'fecha_folio', type: 'date', nullable: true })
  fecha_folio?: Date;

  // Relación con el fiador principal
  @OneToOne(() => Guarantor, (guarantor) => guarantor.propiedad_garantia)
  guarantor: Guarantor;
}