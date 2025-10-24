import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Rental } from './rental.entity';

@Entity('propietarios_pm')
export class PropietarioPm {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del propietario' })
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

  @Column({ name: 'dom_referencias', nullable: true })
  @ApiProperty({ description: 'Referencias', nullable: true })
  domReferencias?: string;

  // Datos de Pago
  @Column({ name: 'forma_pago', type: 'enum', enum: ['efectivo', 'transferencia', 'cheque', 'otro'] })
  @ApiProperty({ enum: ['efectivo', 'transferencia', 'cheque', 'otro'], description: 'Forma de pago' })
  formaPago: string;

  @Column({ name: 'otra_forma_pago', nullable: true })
  @ApiProperty({ description: 'Otra forma de pago', nullable: true })
  otraFormaPago?: string;

  @Column({ name: 'titular_cuenta', nullable: true })
  @ApiProperty({ description: 'Titular de la cuenta', nullable: true })
  titularCuenta?: string;

  @Column({ name: 'numero_cuenta', nullable: true })
  @ApiProperty({ description: 'Número de cuenta', nullable: true })
  numeroCuenta?: string;

  @Column({ name: 'banco', nullable: true })
  @ApiProperty({ description: 'Banco', nullable: true })
  banco?: string;

  @Column({ name: 'clabe', nullable: true })
  @ApiProperty({ description: 'CLABE', nullable: true })
  clabe?: string;

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

  // Apoderado Legal/Representante
  @Column({ name: 'rep_legal_nombres' })
  @ApiProperty({ description: 'Nombres del representante legal' })
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

  @Column({ name: 'rep_legal_curp' })
  @ApiProperty({ description: 'CURP del representante legal' })
  repLegalCurp: string;

  @Column({ name: 'rep_legal_email' })
  @ApiProperty({ description: 'Email del representante legal' })
  repLegalEmail: string;

  @Column({ name: 'rep_legal_telefono' })
  @ApiProperty({ description: 'Teléfono del representante legal' })
  repLegalTelefono: string;

  // Domicilio Representante Legal
  @Column({ name: 'rep_legal_calle' })
  @ApiProperty({ description: 'Calle del representante legal' })
  repLegalCalle: string;

  @Column({ name: 'rep_legal_num_ext' })
  @ApiProperty({ description: 'Número exterior del representante legal' })
  repLegalNumExt: string;

  @Column({ name: 'rep_legal_num_int', nullable: true })
  @ApiProperty({ description: 'Número interior del representante legal', nullable: true })
  repLegalNumInt?: string;

  @Column({ name: 'rep_legal_cp' })
  @ApiProperty({ description: 'Código postal del representante legal' })
  repLegalCp: string;

  @Column({ name: 'rep_legal_colonia' })
  @ApiProperty({ description: 'Colonia del representante legal' })
  repLegalColonia: string;

  @Column({ name: 'rep_legal_municipio' })
  @ApiProperty({ description: 'Municipio del representante legal' })
  repLegalMunicipio: string;

  @Column({ name: 'rep_legal_estado' })
  @ApiProperty({ description: 'Estado del representante legal' })
  repLegalEstado: string;

  // Facultades del Representante
  @Column({ name: 'facultades_acta', nullable: true })
  @ApiProperty({ description: '¿Facultades en acta constitutiva?', nullable: true })
  facultadesActa?: boolean;

  @Column({ name: 'facultades_escritura_numero', nullable: true })
  @ApiProperty({ description: 'Número de escritura de facultades', nullable: true })
  facultadesEscrituraNumero?: string;

  @Column({ name: 'facultades_notario_numero', nullable: true })
  @ApiProperty({ description: 'Número de notaría de facultades', nullable: true })
  facultadesNotarioNumero?: string;

  @Column({ name: 'facultades_fecha_escritura', type: 'date', nullable: true })
  @ApiProperty({ description: 'Fecha de escritura de facultades', nullable: true })
  facultadesFechaEscritura?: Date;

  @Column({ name: 'facultades_numero_inscripcion', nullable: true })
  @ApiProperty({ description: 'Número de inscripción de facultades', nullable: true })
  facultadesNumeroInscripcion?: string;

  @Column({ name: 'facultades_ciudad_registro', nullable: true })
  @ApiProperty({ description: 'Ciudad de registro de facultades', nullable: true })
  facultadesCiudadRegistro?: string;

  @Column({ name: 'facultades_estado_registro', nullable: true })
  @ApiProperty({ description: 'Estado de registro de facultades', nullable: true })
  facultadesEstadoRegistro?: string;

  @Column({ name: 'tipo_representacion', type: 'enum', enum: ['administrador_unico', 'presidente_consejo', 'socio_administrador', 'gerente', 'otro'], nullable: true })
  @ApiProperty({ enum: ['administrador_unico', 'presidente_consejo', 'socio_administrador', 'gerente', 'otro'], description: 'Tipo de representación', nullable: true })
  tipoRepresentacion?: string;

  @Column({ name: 'tipo_representacion_otro', nullable: true })
  @ApiProperty({ description: 'Otro tipo de representación', nullable: true })
  tipoRepresentacionOtro?: string;

  // Datos del Inmueble
  @Column({ name: 'tipo_inmueble', type: 'enum', enum: ['casa', 'departamento', 'local_comercial', 'oficina', 'bodega', 'nave_industrial', 'consultorio', 'terreno'], nullable: true })
  @ApiProperty({ enum: ['casa', 'departamento', 'local_comercial', 'oficina', 'bodega', 'nave_industrial', 'consultorio', 'terreno'], description: 'Tipo de inmueble', nullable: true })
  tipoInmueble?: string;

  @Column({ name: 'uso_inmueble', type: 'enum', enum: ['habitacional', 'comercial', 'industrial'], nullable: true })
  @ApiProperty({ enum: ['habitacional', 'comercial', 'industrial'], description: 'Uso de suelo', nullable: true })
  usoInmueble?: string;

  @Column({ name: 'permite_mascotas', nullable: true })
  @ApiProperty({ description: '¿Permite mascotas?', nullable: true })
  permiteMascotas?: boolean;

  @Column({ name: 'mascotas_especificacion', nullable: true })
  @ApiProperty({ description: 'Especificación de mascotas', nullable: true })
  mascotasEspecificacion?: string;

  @Column({ name: 'precio_renta', type: 'decimal', precision: 10, scale: 2, nullable: true })
  @ApiProperty({ description: 'Precio de renta', nullable: true })
  precioRenta?: number;

  @Column({ name: 'iva_renta', type: 'enum', enum: ['iva_incluido', 'mas_iva', 'sin_iva'], nullable: true })
  @ApiProperty({ enum: ['iva_incluido', 'mas_iva', 'sin_iva'], description: 'IVA en la renta', nullable: true })
  ivaRenta?: string;

  @Column({ name: 'frecuencia_pago', type: 'enum', enum: ['mensual', 'semanal', 'quincenal', 'semestral', 'anual', 'otra'], nullable: true })
  @ApiProperty({ enum: ['mensual', 'semanal', 'quincenal', 'semestral', 'anual', 'otra'], description: 'Frecuencia de pago', nullable: true })
  frecuenciaPago?: string;

  @Column({ name: 'otra_frecuencia', nullable: true })
  @ApiProperty({ description: 'Otra frecuencia de pago', nullable: true })
  otraFrecuencia?: string;

  @Column({ name: 'condiciones_pago', type: 'text', nullable: true })
  @ApiProperty({ description: 'Condiciones de pago', nullable: true })
  condicionesPago?: string;

  @Column({ name: 'deposito_garantia', type: 'decimal', precision: 10, scale: 2, nullable: true })
  @ApiProperty({ description: 'Depósito en garantía', nullable: true })
  depositoGarantia?: number;

  @Column({ name: 'paga_mantenimiento', nullable: true })
  @ApiProperty({ description: '¿Se paga mantenimiento?', nullable: true })
  pagaMantenimiento?: boolean;

  @Column({ name: 'quien_paga_mantenimiento', type: 'enum', enum: ['arrendatario', 'arrendador'], nullable: true })
  @ApiProperty({ enum: ['arrendatario', 'arrendador'], description: '¿Quién paga el mantenimiento?', nullable: true })
  quienPagaMantenimiento?: string;

  @Column({ name: 'mantenimiento_incluido', nullable: true })
  @ApiProperty({ description: '¿Mantenimiento incluido en renta?', nullable: true })
  mantenimientoIncluido?: boolean;

  @Column({ name: 'costo_mantenimiento', type: 'decimal', precision: 10, scale: 2, nullable: true })
  @ApiProperty({ description: 'Costo mensual de mantenimiento', nullable: true })
  costoMantenimiento?: number;

  @Column({ name: 'instrucciones_pago', type: 'text', nullable: true })
  @ApiProperty({ description: 'Instrucciones de pago', nullable: true })
  instruccionesPago?: string;

  @Column({ name: 'requiere_seguro', nullable: true })
  @ApiProperty({ description: '¿Requiere seguro?', nullable: true })
  requiereSeguro?: boolean;

  @Column({ name: 'cobertura_seguro', nullable: true })
  @ApiProperty({ description: 'Cobertura del seguro', nullable: true })
  coberturaSeguro?: string;

  @Column({ name: 'monto_seguro', type: 'decimal', precision: 10, scale: 2, nullable: true })
  @ApiProperty({ description: 'Monto que cubre el seguro', nullable: true })
  montoSeguro?: number;

  @Column({ name: 'servicios_pagar', type: 'text', nullable: true })
  @ApiProperty({ description: 'Servicios a pagar', nullable: true })
  serviciosPagar?: string;

  // Dirección del Inmueble
  @Column({ name: 'inmueble_calle', nullable: true })
  @ApiProperty({ description: 'Calle del inmueble', nullable: true })
  inmuebleCalle?: string;

  @Column({ name: 'inmueble_num_ext', nullable: true })
  @ApiProperty({ description: 'Número exterior del inmueble', nullable: true })
  inmuebleNumExt?: string;

  @Column({ name: 'inmueble_num_int', nullable: true })
  @ApiProperty({ description: 'Número interior del inmueble', nullable: true })
  inmuebleNumInt?: string;

  @Column({ name: 'inmueble_cp', nullable: true })
  @ApiProperty({ description: 'Código postal del inmueble', nullable: true })
  inmuebleCp?: string;

  @Column({ name: 'inmueble_colonia', nullable: true })
  @ApiProperty({ description: 'Colonia del inmueble', nullable: true })
  inmuebleColonia?: string;

  @Column({ name: 'inmueble_municipio', nullable: true })
  @ApiProperty({ description: 'Municipio del inmueble', nullable: true })
  inmuebleMunicipio?: string;

  @Column({ name: 'inmueble_estado', nullable: true })
  @ApiProperty({ description: 'Estado del inmueble', nullable: true })
  inmuebleEstado?: string;

  @Column({ name: 'inmueble_referencias', type: 'text', nullable: true })
  @ApiProperty({ description: 'Referencias del inmueble', nullable: true })
  inmuebleReferencias?: string;

  @Column({ name: 'inmueble_inventario', type: 'text', nullable: true })
  @ApiProperty({ description: 'Inventario del inmueble', nullable: true })
  inmuebleInventario?: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  @ApiProperty({ description: 'Fecha de creación' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  @ApiProperty({ description: 'Fecha de última actualización' })
  fechaActualizacion: Date;
}