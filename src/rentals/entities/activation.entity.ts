import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('activacion_renta')
export class Activation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'renta_id' })
  renta_id: number;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
  fecha_inicio?: Date;

  @Column({ name: 'plazo_meses', nullable: true })
  plazo_meses?: number;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fecha_fin?: Date;

  @Column({ name: 'monto_renta', type: 'decimal', precision: 10, scale: 2, nullable: true })
  monto_renta?: number;

  @Column({ name: 'monto_comision', type: 'decimal', precision: 10, scale: 2, nullable: true })
  monto_comision?: number;

  @Column({ name: 'tipo_comision', nullable: true })
  tipo_comision?: string;

  @Column({ name: 'monto_neto_comision', type: 'decimal', precision: 10, scale: 2, nullable: true })
  monto_neto_comision?: number;

  @Column({ name: 'forma_cobro_comision', nullable: true })
  forma_cobro_comision?: string;

  @Column({ default: false, nullable: true })
  activated?: boolean;

  @Column({ name: 'generar_administracion', default: false, nullable: true })
  generar_administracion?: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
