import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Rental } from './rental.entity';

@Entity('obligados_solidarios_pf')
export class ObligadoSolidarioPf {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del obligado solidario' })
  id: string;

  @OneToOne(() => Rental)
  @JoinColumn({ name: 'renta_id' })
  renta: Rental;

  @Column({ name: 'renta_id' })
  rentaId: string;

  // Datos Personales
  @Column()
  @ApiProperty({ description: 'Nombre(s)' })
  nombres: string;

  @Column({ name: 'apellido_paterno' })
  @ApiProperty({ description: 'Apellido paterno' })
  apellidoPaterno: string;

  @Column({ name: 'apellido_materno' })
  @ApiProperty({ description: 'Apellido materno' })
  apellidoMaterno: string;

  @Column({ type: 'enum', enum: ['mexicana', 'extranjera'] })
  @ApiProperty({ enum: ['mexicana', 'extranjera'], description: 'Nacionalidad' })
  nacionalidad: string;

  @Column({ nullable: true, name: 'nacionalidad_especifique' })
  @ApiProperty({ description: 'Especifique nacionalidad', nullable: true })
  nacionalidadEspecifique?: string;

  @Column({ type: 'enum', enum: ['masculino', 'femenino'] })
  @ApiProperty({ enum: ['masculino', 'femenino'], description: 'Sexo' })
  sexo: string;

  @Column({ name: 'estado_civil', type: 'enum', enum: ['soltero', 'casado', 'divorciado', 'union_libre'] })
  @ApiProperty({ enum: ['soltero', 'casado', 'divorciado', 'union_libre'], description: 'Estado civil' })
  estadoCivil: string;

  @Column()
  @ApiProperty({ description: 'Correo electrónico' })
  email: string;

  @Column({ name: 'telefono_celular' })
  @ApiProperty({ description: 'Teléfono celular' })
  telefonoCelular: string;

  @Column({ name: 'telefono_fijo', nullable: true })
  @ApiProperty({ description: 'Teléfono fijo', nullable: true })
  telefonoFijo?: string;

  @Column({ name: 'relacion_solicitante' })
  @ApiProperty({ description: 'Relación con el solicitante' })
  relacionSolicitante: string;

  @Column({ name: 'tiempo_conocer' })
  @ApiProperty({ description: 'Tiempo de conocerlo' })
  tiempoConocer: string;

  // Domicilio Actual
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

  // Empleo
  @Column({ name: 'empresa_trabaja', nullable: true })
  @ApiProperty({ description: 'Empresa donde trabaja', nullable: true })
  empresaTrabaja?: string;

  @Column({ name: 'fecha_ingreso', type: 'date', nullable: true })
  @ApiProperty({ description: 'Fecha de ingreso', nullable: true })
  fechaIngreso?: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Profesión', nullable: true })
  profesion?: string;

  @Column({ name: 'tipo_empleo', type: 'enum', enum: ['dueño_negocio', 'empresario', 'independiente', 'empleado', 'comisionista', 'jubilado'], nullable: true })
  @ApiProperty({ enum: ['dueño_negocio', 'empresario', 'independiente', 'empleado', 'comisionista', 'jubilado'], description: 'Tipo de empleo', nullable: true })
  tipoEmpleo?: string;

  @Column({ name: 'ingreso_mensual', type: 'decimal', precision: 12, scale: 2, nullable: true })
  @ApiProperty({ description: 'Ingreso mensual', nullable: true })
  ingresoMensual?: number;

  @Column({ name: 'autoriza_investigacion' })
  @ApiProperty({ description: 'Autoriza investigación' })
  autorizaInvestigacion: boolean;

  @Column({ name: 'declara_veracidad' })
  @ApiProperty({ description: 'Declara veracidad' })
  declaraVeracidad: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  @ApiProperty({ description: 'Fecha de creación' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  @ApiProperty({ description: 'Fecha de última actualización' })
  fechaActualizacion: Date;
}