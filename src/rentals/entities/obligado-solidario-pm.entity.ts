// src/rentals/entities/obligado-solidario-pm.entity.ts
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

  @Column({ name: 'rep_legal_sexo', type: 'enum', enum: ['masculino', 'femenino'] })
  @ApiProperty({ enum: ['masculino', 'femenino'], description: 'Sexo del representante legal' })
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

  // DOMICILIO REPRESENTANTE LEGAL 
  @Column({ name: 'rep_legal_calle', nullable: true })
  @ApiProperty({ description: 'Calle representante legal', nullable: true })
  repLegalCalle?: string;

  @Column({ name: 'rep_legal_num_ext', nullable: true })
  @ApiProperty({ description: 'Número exterior representante', nullable: true })
  repLegalNumExt?: string;

  @Column({ name: 'rep_legal_num_int', nullable: true })
  @ApiProperty({ description: 'Número interior representante', nullable: true })
  repLegalNumInt?: string;

  @Column({ name: 'rep_legal_cp', nullable: true })
  @ApiProperty({ description: 'Código postal representante', nullable: true })
  repLegalCp?: string;

  @Column({ name: 'rep_legal_colonia', nullable: true })
  @ApiProperty({ description: 'Colonia representante', nullable: true })
  repLegalColonia?: string;

  @Column({ name: 'rep_legal_municipio', nullable: true })
  @ApiProperty({ description: 'Municipio representante', nullable: true })
  repLegalMunicipio?: string;

  @Column({ name: 'rep_legal_estado', nullable: true })
  @ApiProperty({ description: 'Estado representante', nullable: true })
  repLegalEstado?: string;

  // FACULTADES DEL REPRESENTANTE 
  @Column({ name: 'facultades_acta', type: 'boolean', default: false })
  @ApiProperty({ description: 'Facultades constan en acta constitutiva' })
  facultadesActa: boolean;

  @Column({ name: 'facultades_escritura_numero', nullable: true })
  @ApiProperty({ description: 'Escritura pública número', nullable: true })
  facultadesEscrituraNumero?: string;

  @Column({ name: 'facultades_notario_numero', nullable: true })
  @ApiProperty({ description: 'Notario número', nullable: true })
  facultadesNotarioNumero?: string;

  @Column({ name: 'facultades_fecha_escritura', type: 'date', nullable: true })
  @ApiProperty({ description: 'Fecha de escritura facultades', nullable: true })
  facultadesFechaEscritura?: Date;

  @Column({ name: 'facultades_numero_inscripcion', nullable: true })
  @ApiProperty({ description: 'Número de inscripción registro', nullable: true })
  facultadesNumeroInscripcion?: string;

  @Column({ name: 'facultades_fecha_inscripcion', type: 'date', nullable: true })
  @ApiProperty({ description: 'Fecha de inscripción', nullable: true })
  facultadesFechaInscripcion?: Date;

  @Column({ name: 'facultades_ciudad_registro', nullable: true })
  @ApiProperty({ description: 'Ciudad de registro facultades', nullable: true })
  facultadesCiudadRegistro?: string;

  @Column({ name: 'facultades_estado_registro', nullable: true })
  @ApiProperty({ description: 'Estado de registro facultades', nullable: true })
  facultadesEstadoRegistro?: string;

  @Column({ name: 'tipo_representacion', type: 'enum', enum: ['administrador_unico', 'presidente_consejo', 'socio_administrador', 'gerente', 'otro'], nullable: true })
  @ApiProperty({ enum: ['administrador_unico', 'presidente_consejo', 'socio_administrador', 'gerente', 'otro'], description: 'Tipo de representación', nullable: true })
  tipoRepresentacion?: string;

  @Column({ name: 'tipo_representacion_otro', nullable: true })
  @ApiProperty({ description: 'Especifique tipo representación', nullable: true })
  tipoRepresentacionOtro?: string;

  // PROPIEDAD EN GARANTÍA (OPCIONAL) 
  @Column({ name: 'garantia_calle', nullable: true })
  @ApiProperty({ description: 'Calle propiedad garantía', nullable: true })
  garantiaCalle?: string;

  @Column({ name: 'garantia_num_ext', nullable: true })
  @ApiProperty({ description: 'Número exterior garantía', nullable: true })
  garantiaNumExt?: string;

  @Column({ name: 'garantia_num_int', nullable: true })
  @ApiProperty({ description: 'Número interior garantía', nullable: true })
  garantiaNumInt?: string;

  @Column({ name: 'garantia_cp', nullable: true })
  @ApiProperty({ description: 'Código postal garantía', nullable: true })
  garantiaCp?: string;

  @Column({ name: 'garantia_colonia', nullable: true })
  @ApiProperty({ description: 'Colonia garantía', nullable: true })
  garantiaColonia?: string;

  @Column({ name: 'garantia_municipio', nullable: true })
  @ApiProperty({ description: 'Municipio garantía', nullable: true })
  garantiaMunicipio?: string;

  @Column({ name: 'garantia_estado', nullable: true })
  @ApiProperty({ description: 'Estado garantía', nullable: true })
  garantiaEstado?: string;

  @Column({ name: 'garantia_numero_escritura', nullable: true })
  @ApiProperty({ description: 'Número de escritura garantía', nullable: true })
  garantiaNumeroEscritura?: string;

  @Column({ name: 'garantia_fecha_escritura', type: 'date', nullable: true })
  @ApiProperty({ description: 'Fecha de escritura garantía', nullable: true })
  garantiaFechaEscritura?: Date;

  @Column({ name: 'garantia_notario_nombres', nullable: true })
  @ApiProperty({ description: 'Nombre(s) notario garantía', nullable: true })
  garantiaNotarioNombres?: string;

  @Column({ name: 'garantia_notario_apellido_paterno', nullable: true })
  @ApiProperty({ description: 'Apellido paterno notario garantía', nullable: true })
  garantiaNotarioApellidoPaterno?: string;

  @Column({ name: 'garantia_notario_apellido_materno', nullable: true })
  @ApiProperty({ description: 'Apellido materno notario garantía', nullable: true })
  garantiaNotarioApellidoMaterno?: string;

  @Column({ name: 'garantia_notario_numero', nullable: true })
  @ApiProperty({ description: 'Número de notaría garantía', nullable: true })
  garantiaNotarioNumero?: string;

  @Column({ name: 'garantia_notario_lugar', nullable: true })
  @ApiProperty({ description: 'Lugar de notaría garantía', nullable: true })
  garantiaNotarioLugar?: string;

  @Column({ name: 'garantia_registro_publico', nullable: true })
  @ApiProperty({ description: 'Registro público propiedad', nullable: true })
  garantiaRegistroPublico?: string;

  @Column({ name: 'garantia_folio_real', nullable: true })
  @ApiProperty({ description: 'Folio real electrónico', nullable: true })
  garantiaFolioReal?: string;

  @Column({ name: 'garantia_fecha_registro', type: 'date', nullable: true })
  @ApiProperty({ description: 'Fecha de registro', nullable: true })
  garantiaFechaRegistro?: Date;

  @Column({ name: 'garantia_boleta_predial', nullable: true })
  @ApiProperty({ description: 'Número de boleta predial', nullable: true })
  garantiaBoletaPredial?: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  @ApiProperty({ description: 'Fecha de creación' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  @ApiProperty({ description: 'Fecha de última actualización' })
  fechaActualizacion: Date;
}