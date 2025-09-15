import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('propietarios')
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_persona' })
  tipo_persona: string;

  @Column({ name: 'nombre_completo', nullable: true })
  nombre_completo?: string;

  @Column({ name: 'telefono', length: 15, nullable: true })
  telefono?: string;

  @Column({ name: 'correo', nullable: true })
  correo?: string;

  @Column({ name: 'razon_social', nullable: true })
  razon_social?: string;

  @Column({ name: 'nombre_comercial', nullable: true })
  nombre_comercial?: string;

  @Column({ name: 'representante_legal', nullable: true })
  representante_legal?: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
