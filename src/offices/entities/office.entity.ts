import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { City } from './city.entity';
import { Estate } from './estate.entity';

@Entity('offices')
export class Office {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', nullable: true })
  telefono: string;

  @Column({ type: 'varchar', nullable: true })
  correo: string;

  @Column({ type: 'varchar', nullable: true })
  responsable: string;

  @Column({ type: 'varchar', nullable: true })
  clave: string;

  @Column({ type: 'boolean', default: true })
  estatus_actividad: boolean;

  @Column({ type: 'boolean', default: true })
  estatus_recibir_leads: boolean;

  @Column({ type: 'varchar', nullable: true })
  calle: string;

  @Column({ type: 'varchar', nullable: true })
  numero_interior: string;

  @Column({ type: 'varchar', nullable: true })
  numero_exterior: string;

  @Column({ type: 'varchar', nullable: true })
  colonia: string;

  @Column({ type: 'varchar', nullable: true })
  delegacion_municipio: string;

  @Column({ name: 'ciudad', nullable: true })
  ciudad: number;

  @Column({ name: 'estate_id', nullable: true })
  estate_id: number;

  @Column({ type: 'varchar', nullable: true })
  codigo_postal: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  lat: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  lng: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Relaciones
  @ManyToOne(() => City, { nullable: true })
  @JoinColumn({ name: 'ciudad' })
  city: City;

  @ManyToOne(() => Estate, { nullable: true })
  @JoinColumn({ name: 'estate_id' })
  estate: Estate;

  @ManyToMany(() => User, (user) => user.offices)
  users: User[];
}