import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('formalizacion_renta')
export class Formalization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'renta_id' })
  renta_id: number;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
  fecha_inicio?: Date;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fecha_fin?: Date;

  @Column({ name: 'fecha_firma_prevista', type: 'date', nullable: true })
  fecha_firma_prevista?: Date;

  @Column({ name: 'poliza_oficina_id', nullable: true })
  poliza_oficina_id?: number;

  @Column({ name: 'abogado_id', nullable: true })
  abogado_id?: number;

  @Column({ name: 'producto_poliza', nullable: true })
  producto_poliza?: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
