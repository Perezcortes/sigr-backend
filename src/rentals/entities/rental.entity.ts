import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('rentas')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único de la renta' })
  id: string;

  @Column({ type: 'enum', enum: ['fisica', 'moral'], name: 'tipo_inquilino' })
  @ApiProperty({ enum: ['fisica', 'moral'], description: 'Tipo de persona del inquilino' })
  tipoInquilino: string;

  @Column({ type: 'enum', enum: ['fisica', 'moral'], name: 'tipo_obligado' })
  @ApiProperty({ enum: ['fisica', 'moral'], description: 'Tipo de persona del obligado solidario' })
  tipoObligado: string;

  @Column({ type: 'enum', enum: ['fisica', 'moral'], name: 'tipo_propietario' })
  @ApiProperty({ enum: ['fisica', 'moral'], description: 'Tipo de persona del propietario' })
  tipoPropietario: string;

  @Column({ type: 'varchar', length: 50, name: 'tipo_propiedad' })
  @ApiProperty({ description: 'Tipo de propiedad' })
  tipoPropiedad: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Observaciones', nullable: true })
  observaciones?: string;

  @Column({ type: 'enum', enum: ['activa', 'inactiva', 'cancelada', 'pendiente'], default: 'pendiente' })
  @ApiProperty({ enum: ['activa', 'inactiva', 'cancelada', 'pendiente'], description: 'Estado de la renta' })
  estado: string;

  @Column({ name: 'usuario_creacion' })
  @ApiProperty({ description: 'Usuario que creó la renta' })
  usuarioCreacion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  @ApiProperty({ description: 'Fecha de creación' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  @ApiProperty({ description: 'Fecha de última actualización' })
  fechaActualizacion: Date;
}