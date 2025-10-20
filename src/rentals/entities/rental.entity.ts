import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { InquilinoPf } from './inquilino-pf.entity';
import { InquilinoPm } from './inquilino-pm.entity';
import { ObligadoSolidarioPf } from './obligado-solidario-pf.entity';
import { ObligadoSolidarioPm } from './obligado-solidario-pm.entity';
import { PropietarioPf } from './propietario-pf.entity';
import { PropietarioPm } from './propietario-pm.entity';
import { Propiedad } from './propiedad.entity';

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

  // Relaciones
  @OneToOne(() => InquilinoPf, inquilinoPf => inquilinoPf.renta)
  inquilinoPf?: InquilinoPf;

  @OneToOne(() => InquilinoPm, inquilinoPm => inquilinoPm.renta)
  inquilinoPm?: InquilinoPm;

  @OneToOne(() => Propiedad, propiedad => propiedad.renta)
  propiedad?: Propiedad;

  @OneToOne(() => PropietarioPf, propietarioPf => propietarioPf.renta)
  propietarioPf?: PropietarioPf;

  @OneToOne(() => PropietarioPm, propietarioPm => propietarioPm.renta)
  propietarioPm?: PropietarioPm;

  @OneToOne(() => ObligadoSolidarioPf, obligadoPf => obligadoPf.renta)
  obligadoPf?: ObligadoSolidarioPf;

  @OneToOne(() => ObligadoSolidarioPm, obligadoPm => obligadoPm.renta)
  obligadoPm?: ObligadoSolidarioPm;
}