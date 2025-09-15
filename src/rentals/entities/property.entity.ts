import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Owner } from './owner.entity';

@Entity('propiedades')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  tipo?: string;

  @Column({ name: 'codigo_postal', nullable: true })
  codigo_postal?: string;

  @Column({ name: 'estado_id', nullable: true })
  estado_id?: number;

  @Column({ name: 'ciudad_id', nullable: true })
  ciudad_id?: number;

  @Column({ nullable: true })
  colonia?: string;

  @Column({ nullable: true })
  calle?: string;

  @Column({ nullable: true })
  numero?: string;

  @Column({ nullable: true })
  interior?: string;

  @Column({ nullable: true })
  referencia?: string;

  @Column({ name: 'metros_cuadrados', type: 'decimal', precision: 10, scale: 2, nullable: true })
  metros_cuadrados?: number;

  @Column({ name: 'monto_renta', type: 'decimal', precision: 10, scale: 2, nullable: true })
  monto_renta?: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  // Relaciones
  @ManyToOne(() => Owner)
  @JoinColumn({ name: 'propietario_id' })
  propietario: Owner;
}
