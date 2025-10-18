import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Rental } from './rental.entity';

@Entity('inquilinos_pm')
export class InquilinoPm {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del inquilino' })
  id: string;

  @OneToOne(() => Rental)
  @JoinColumn({ name: 'renta_id' })
  renta: Rental;

  @Column({ name: 'renta_id' })
  rentaId: string;

  // Datos de la Empresa
  @Column({ name: 'nombre_empresa' })
  @ApiProperty({ description: 'Nombre de la empresa' })
  nombreEmpresa: string;

  @Column()
  @ApiProperty({ description: 'Correo electrónico' })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Dominio de internet', nullable: true })
  dominio?: string;

  @Column()
  @ApiProperty({ description: 'RFC' })
  rfc: string;

  @Column()
  @ApiProperty({ description: 'Teléfono' })
  telefono: string;

  @Column({ name: 'ingreso_mensual', type: 'decimal', precision: 12, scale: 2, nullable: true })
  @ApiProperty({ description: 'Ingreso mensual promedio', nullable: true })
  ingresoMensual?: number;

  // Domicilio de la Empresa
  @Column({ name: 'dom_calle' })
  @ApiProperty({ description: 'Calle del domicilio' })
  domCalle: string;

  @Column({ name: 'dom_num_ext' })
  @ApiProperty({ description: 'Número exterior' })
  domNumExt: string;

  @Column({ name: 'dom_num_int', nullable: true })
  @ApiProperty({ description: 'Número interior', nullable: true })
  domNumInt?: string;

  @Column({ name: 'dom_cp' })
  @ApiProperty({ description: 'Código postal' })
  domCp: string;

  @Column({ name: 'dom_colonia' })
  @ApiProperty({ description: 'Colonia' })
  domColonia: string;

  @Column({ name: 'dom_municipio' })
  @ApiProperty({ description: 'Municipio' })
  domMunicipio: string;

  @Column({ name: 'dom_estado' })
  @ApiProperty({ description: 'Estado' })
  domEstado: string;

  // Acta Constitutiva
  @Column({ name: 'notario_nombres' })
  @ApiProperty({ description: 'Nombre(s) del notario' })
  notarioNombres: string;

  @Column({ name: 'notario_apellido_paterno' })
  @ApiProperty({ description: 'Apellido paterno del notario' })
  notarioApellidoPaterno: string;

  @Column({ name: 'notario_apellido_materno' })
  @ApiProperty({ description: 'Apellido materno del notario' })
  notarioApellidoMaterno: string;

  @Column({ name: 'numero_escritura' })
  @ApiProperty({ description: 'Número de escritura' })
  numeroEscritura: string;

  @Column({ name: 'fecha_constitucion', type: 'date' })
  @ApiProperty({ description: 'Fecha de constitución' })
  fechaConstitucion: Date;

  @Column({ name: 'notario_numero' })
  @ApiProperty({ description: 'Número de notaría' })
  notarioNumero: string;

  @Column({ name: 'ciudad_registro' })
  @ApiProperty({ description: 'Ciudad de registro' })
  ciudadRegistro: string;

  @Column({ name: 'estado_registro' })
  @ApiProperty({ description: 'Estado de registro' })
  estadoRegistro: string;

  @Column({ name: 'numero_registro' })
  @ApiProperty({ description: 'Número de registro' })
  numeroRegistro: string;

  @Column({ name: 'giro_comercial' })
  @ApiProperty({ description: 'Giro comercial' })
  giroComercial: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  @ApiProperty({ description: 'Fecha de creación' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  @ApiProperty({ description: 'Fecha de última actualización' })
  fechaActualizacion: Date;
}