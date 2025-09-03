import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('offices')
export class Office {
  @ApiProperty({
    description: 'ID único de la oficina',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre de la oficina',
    example: 'Oficina Centro',
  })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({
    description: 'Código único de la oficina',
    example: 'OFC001',
    required: false,
  })
  @Column({ unique: true, length: 20, nullable: true })
  code?: string;

  @ApiProperty({
    description: 'Descripción de la oficina',
    example: 'Oficina ubicada en el centro de la ciudad',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Dirección de la oficina',
    example: 'Av. Principal 123, Centro',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  address?: string;

  @ApiProperty({
    description: 'Ciudad',
    example: 'Ciudad de México',
    required: false,
  })
  @Column({ length: 100, nullable: true })
  city?: string;

  @ApiProperty({
    description: 'Estado',
    example: 'CDMX',
    required: false,
  })
  @Column({ length: 100, nullable: true })
  state?: string;

  @ApiProperty({
    description: 'Código postal',
    example: '01000',
    required: false,
  })
  @Column({ length: 20, nullable: true })
  postal_code?: string;

  @ApiProperty({
    description: 'País',
    example: 'México',
  })
  @Column({ length: 50, default: 'México' })
  country: string;

  @ApiProperty({
    description: 'Teléfono de la oficina',
    example: '+52 55 1234 5678',
    required: false,
  })
  @Column({ length: 20, nullable: true })
  phone?: string;

  @ApiProperty({
    description: 'Email de la oficina',
    example: 'centro@rentas.com',
    required: false,
  })
  @Column({ length: 100, nullable: true })
  email?: string;

  @ApiProperty({
    description: 'Estado de la oficina',
    example: true,
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: 'Indica si es la oficina principal',
    example: false,
  })
  @Column({ default: false })
  is_headquarters: boolean;

  @ApiProperty({
    description: 'Límite máximo de usuarios',
    example: 50,
  })
  @Column({ default: 50 })
  max_users: number;

  @ApiProperty({
    description: 'Fecha de creación',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    description: 'Fecha de eliminación (soft delete)',
    required: false,
  })
  @DeleteDateColumn()
  deleted_at?: Date;

  // Relaciones
  @OneToMany(() => User, (user) => user.office)
  users: User[];

  @Column({ nullable: true })
  manager_id?: string;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'manager_id' })
  manager?: User;
}