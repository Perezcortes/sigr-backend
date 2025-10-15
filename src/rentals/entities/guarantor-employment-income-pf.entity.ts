// src/rentals/entities/guarantor-employment-income-pf.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Guarantor } from './guarantor.entity';

@Entity('guarantor_employment_income_pf')
export class GuarantorEmploymentIncomePf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'empresa', nullable: true })
  empresa?: string;
  @Column({ name: 'profesion', nullable: true })
  profesion?: string;
  @Column({ name: 'ingreso_mensual', type: 'decimal', precision: 12, scale: 2, nullable: true })
  ingreso_mensual?: number;
  @Column({ name: 'fecha_ingreso', type: 'date', nullable: true })
  fecha_ingreso?: Date;
  @Column({ name: 'tipo_empleo', nullable: true })
  tipo_empleo?: string;
  
  // Ubicación de la empresa
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
  @Column({ name: 'del_mun_empresa', nullable: true })
  del_mun_empresa?: string;
  @Column({ name: 'edo_empresa', nullable: true })
  edo_empresa?: string;
  @Column({ name: 'tel_empresa', nullable: true })
  tel_empresa?: string;
  @Column({ name: 'ext_empresa', nullable: true })
  ext_empresa?: string;
  
  // Relación con el fiador principal
  @OneToOne(() => Guarantor, (guarantor) => guarantor.empleo_ingresos_pf)
  guarantor: Guarantor;
}