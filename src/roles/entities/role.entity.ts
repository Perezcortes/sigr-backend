import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('roles')
export class Role {
  @ApiProperty({
    description: 'ID único del rol',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre interno del rol',
    example: 'ADMIN',
  })
  @Column({ unique: true, length: 50 })
  name: string;

  @ApiProperty({
    description: 'Nombre visible del rol',
    example: 'Administrador',
  })
  @Column({ length: 100 })
  display_name: string;

  @ApiProperty({
    description: 'Descripción del rol',
    example: 'Acceso completo al sistema',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Estado del rol',
    example: true,
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: 'Indica si es un rol del sistema',
    example: false,
  })
  @Column({ default: false })
  is_system_role: boolean;

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
  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    cascade: true,
  })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}