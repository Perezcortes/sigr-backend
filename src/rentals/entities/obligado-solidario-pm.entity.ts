import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Rental } from './rental.entity';

@Entity('obligados_solidarios_pm')
export class ObligadoSolidarioPm {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del obligado solidario' })
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
  @ApiProperty({ description: 'RFC' })
  rfc: string;

  @Column()
  @ApiProperty({ description: 'Correo electrónico' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Teléfono' })
  telefono: string;

  @Column({ name: 'antiguedad_empresa', nullable: true })
  @ApiProperty({ description: 'Antigüedad de la empresa', nullable: true })
  antiguedadEmpresa?: string;

  @Column({ name: 'ingreso_mensual', type: 'decimal', precision: 12, scale: 2, nullable: true })
  @ApiProperty({ description: 'Ingreso mensual aproximado', nullable: true })
  ingresoMensual?: number;

  @Column({ name: 'actividades_empresa', type: 'text', nullable: true })
  @ApiProperty({ description: 'Actividades de la empresa', nullable: true })
  actividadesEmpresa?: string;

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

  // Representante Legal
  @Column({ name: 'rep_legal_nombres' })
  @ApiProperty({ description: 'Nombre(s) del representante legal' })
  repLegalNombres: string;

  @Column({ name: 'rep_legal_apellido_paterno' })
  @ApiProperty({ description: 'Apellido paterno del representante legal' })
  repLegalApellidoPaterno: string;

  @Column({ name: 'rep_legal_apellido_materno' })
  @ApiProperty({ description: 'Apellido materno del representante legal' })
  repLegalApellidoMaterno: string;

  @Column({ name: 'rep_legal_sexo' })
  @ApiProperty({ description: 'Sexo del representante legal' })
  repLegalSexo: string;

  @Column({ name: 'rep_legal_rfc', nullable: true })
  @ApiProperty({ description: 'RFC del representante legal', nullable: true })
  repLegalRfc?: string;

  @Column({ name: 'rep_legal_curp', nullable: true })
  @ApiProperty({ description: 'CURP del representante legal', nullable: true })
  repLegalCurp?: string;

  @Column({ name: 'rep_legal_email' })
  @ApiProperty({ description: 'Email del representante legal' })
  repLegalEmail: string;

  @Column({ name: 'rep_legal_telefono', nullable: true })
  @ApiProperty({ description: 'Teléfono del representante legal', nullable: true })
  repLegalTelefono?: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  @ApiProperty({ description: 'Fecha de creación' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  @ApiProperty({ description: 'Fecha de última actualización' })
  fechaActualizacion: Date;
}