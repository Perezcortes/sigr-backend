import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rental } from './rental.entity';
import { User } from '../../users/entities/user.entity';

@Entity('documentos')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'renta_id' })
  renta_id: number;

  @Column({ name: 'tipo_documento' })
  tipo_documento: string;

  @Column({ name: 'nombre_archivo' })
  nombre_archivo: string;

  @Column({ name: 'ruta_archivo' })
  ruta_archivo: string;

  @Column({ name: 'uploaded_by_user_id' })
  uploaded_by_user_id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  // Relaciones
  @ManyToOne(() => Rental)
  @JoinColumn({ name: 'renta_id' })
  renta: Rental;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uploaded_by_user_id' })
  uploaded_by: User;
}
