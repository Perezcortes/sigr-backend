// src/offices/entities/estate.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Office } from './office.entity';

@Entity('estates')
export class Estate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  // Relaciones
  @OneToMany(() => Office, (office) => office.estate)
  offices: Office[];
}