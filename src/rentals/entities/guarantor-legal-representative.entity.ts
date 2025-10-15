// src/rentals/entities/guarantor-legal-representative.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Guarantor } from './guarantor.entity';

@Entity('guarantor_legal_representative')
export class GuarantorLegalRepresentative {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', nullable: true })
  nombre?: string;
  @Column({ name: 'apellido_p', nullable: true })
  apellido_p?: string;
  @Column({ name: 'apellido_m', nullable: true })
  apellido_m?: string;
  @Column({ name: 'sexo', nullable: true })
  sexo?: string;
  @Column({ name: 'rfc', nullable: true })
  rfc?: string;
  @Column({ name: 'curp', nullable: true })
  curp?: string;
  @Column({ name: 'email', nullable: true })
  email?: string;
  @Column({ name: 'telefono', nullable: true })
  telefono?: string;

  // Domicilio del representante legal
  @Column({ name: 'calle_dom', nullable: true })
  calle_dom?: string;
  @Column({ name: 'num_ext_dom', nullable: true })
  num_ext_dom?: string;
  @Column({ name: 'num_int_dom', nullable: true })
  num_int_dom?: string;
  @Column({ name: 'cp_dom', nullable: true })
  cp_dom?: string;
  @Column({ name: 'col_dom', nullable: true })
  col_dom?: string;
  @Column({ name: 'del_mun_dom', nullable: true })
  del_mun_dom?: string;
  @Column({ name: 'edo_dom', nullable: true })
  edo_dom?: string;

  // Facultades
  @Column({ name: 'facultades_en_acta', nullable: true })
  facultades_en_acta?: boolean;
  @Column({ name: 'escritura_num', nullable: true })
  escritura_num?: string;
  @Column({ name: 'notario_num', nullable: true })
  notario_num?: number;
  @Column({ name: 'fecha_escritura', type: 'date', nullable: true })
  fecha_escritura?: Date;
  @Column({ name: 'reg_num', nullable: true })
  reg_num?: string;
  @Column({ name: 'ciudad_reg', nullable: true })
  ciudad_reg?: string;
  @Column({ name: 'edo_reg', nullable: true })
  edo_reg?: string;
  @Column({ name: 'fecha_inscripcion', type: 'date', nullable: true })
  fecha_inscripcion?: Date;
  @Column({ name: 'tipo_representacion', nullable: true })
  tipo_representacion?: string;
  @Column({ name: 'otro_tipo_representacion', nullable: true })
  otro_tipo_representacion?: string;

  // Relación con el fiador principal
  @OneToOne(() => Guarantor, (guarantor) => guarantor.representante_legal)
  guarantor: Guarantor;
}