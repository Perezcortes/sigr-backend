import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';

@Entity('permissions')
export class Permission {
  @ApiProperty({
    description: 'ID único del permiso',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre interno del permiso',
    example: 'users.create',
  })
  @Column({ unique: true, length: 100 })
  name: string;

  @ApiProperty({
    description: 'Nombre visible del permiso',
    example: 'Crear Usuarios',
  })
  @Column({ length: 100 })
  display_name: string;

  @ApiProperty({
    description: 'Descripción del permiso',
    example: 'Permite crear nuevos usuarios en el sistema',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Recurso al que aplica el permiso',
    example: 'users',
  })
  @Column({ length: 50 })
  resource: string;

  @ApiProperty({
    description: 'Acción del permiso',
    example: 'create',
  })
  @Column({ length: 50 })
  action: string;

  @ApiProperty({
    description: 'Estado del permiso',
    example: true,
  })
  @Column({ default: true })
  is_active: boolean;

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

  // Relaciones
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}