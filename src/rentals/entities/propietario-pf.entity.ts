import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Rental } from './rental.entity';

@Entity('propietarios_pf')
export class PropietarioPf {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del propietario' })
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

  @Column({ nullable: true })
  @ApiProperty({ description: 'CURP', nullable: true })
  curp?: string;

  @Column()
  @ApiProperty({ description: 'Correo electrónico' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Teléfono' })
  telefono: string;

  @Column({ name: 'estado_civil', type: 'enum', enum: ['casado', 'divorciado', 'soltero', 'union_libre'] })
  @ApiProperty({ enum: ['casado', 'divorciado', 'soltero', 'union_libre'], description: 'Estado civil' })
  estadoCivil: string;

  @Column({ name: 'regimen_conyugal', type: 'enum', enum: ['sociedad_conyugal', 'separacion_bienes'], nullable: true })
  @ApiProperty({ enum: ['sociedad_conyugal', 'separacion_bienes'], description: 'Régimen conyugal', nullable: true })
  regimenConyugal?: string;

  @Column({ type: 'enum', enum: ['masculino', 'femenino'] })
  @ApiProperty({ enum: ['masculino', 'femenino'], description: 'Sexo' })
  sexo: string;

  @Column({ type: 'enum', enum: ['mexicana', 'extranjera'] })
  @ApiProperty({ enum: ['mexicana', 'extranjera'], description: 'Nacionalidad' })
  nacionalidad: string;

  @Column({ name: 'tipo_identificacion', type: 'enum', enum: ['ine', 'pasaporte'] })
  @ApiProperty({ enum: ['ine', 'pasaporte'], description: 'Identificación' })
  tipoIdentificacion: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'RFC', nullable: true })
  rfc?: string;

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

  // Representación por Tercero
  @Column({ name: 'representado_tercero', nullable: true })
  @ApiProperty({ description: '¿Representado por tercero?', nullable: true })
  representadoTercero?: boolean;

  @Column({ name: 'tipo_representacion', type: 'enum', enum: ['autorizacion_rentar', 'mandato_simple', 'carta_poder_notario', 'poder_notarial'], nullable: true })
  @ApiProperty({ enum: ['autorizacion_rentar', 'mandato_simple', 'carta_poder_notario', 'poder_notarial'], description: 'Tipo de representación', nullable: true })
  tipoRepresentacion?: string;

  // Datos del Representante
  @Column({ name: 'rep_nombres', nullable: true })
  @ApiProperty({ description: 'Nombres del representante', nullable: true })
  repNombres?: string;

  @Column({ name: 'rep_apellido_paterno', nullable: true })
  @ApiProperty({ description: 'Apellido paterno del representante', nullable: true })
  repApellidoPaterno?: string;

  @Column({ name: 'rep_apellido_materno', nullable: true })
  @ApiProperty({ description: 'Apellido materno del representante', nullable: true })
  repApellidoMaterno?: string;

  @Column({ name: 'rep_sexo', type: 'enum', enum: ['masculino', 'femenino'], nullable: true })
  @ApiProperty({ enum: ['masculino', 'femenino'], description: 'Sexo del representante', nullable: true })
  repSexo?: string;

  @Column({ name: 'rep_curp', nullable: true })
  @ApiProperty({ description: 'CURP del representante', nullable: true })
  repCurp?: string;

  @Column({ name: 'rep_tipo_identificacion', type: 'enum', enum: ['ine', 'pasaporte'], nullable: true })
  @ApiProperty({ enum: ['ine', 'pasaporte'], description: 'Identificación del representante', nullable: true })
  repTipoIdentificacion?: string;

  @Column({ name: 'rep_rfc', nullable: true })
  @ApiProperty({ description: 'RFC del representante', nullable: true })
  repRfc?: string;

  @Column({ name: 'rep_telefono', nullable: true })
  @ApiProperty({ description: 'Teléfono del representante', nullable: true })
  repTelefono?: string;

  @Column({ name: 'rep_email', nullable: true })
  @ApiProperty({ description: 'Email del representante', nullable: true })
  repEmail?: string;

  // Domicilio del Representante
  @Column({ name: 'rep_calle', nullable: true })
  @ApiProperty({ description: 'Calle del representante', nullable: true })
  repCalle?: string;

  @Column({ name: 'rep_num_ext', nullable: true })
  @ApiProperty({ description: 'Número exterior del representante', nullable: true })
  repNumExt?: string;

  @Column({ name: 'rep_num_int', nullable: true })
  @ApiProperty({ description: 'Número interior del representante', nullable: true })
  repNumInt?: string;

  @Column({ name: 'rep_cp', nullable: true })
  @ApiProperty({ description: 'Código postal del representante', nullable: true })
  repCp?: string;

  @Column({ name: 'rep_colonia', nullable: true })
  @ApiProperty({ description: 'Colonia del representante', nullable: true })
  repColonia?: string;

  @Column({ name: 'rep_municipio', nullable: true })
  @ApiProperty({ description: 'Municipio del representante', nullable: true })
  repMunicipio?: string;

  @Column({ name: 'rep_estado', nullable: true })
  @ApiProperty({ description: 'Estado del representante', nullable: true })
  repEstado?: string;

  @Column({ name: 'rep_referencias', type: 'text', nullable: true })
  @ApiProperty({ description: 'Referencias del domicilio del representante', nullable: true })
  repReferencias?: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  @ApiProperty({ description: 'Fecha de creación' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  @ApiProperty({ description: 'Fecha de última actualización' })
  fechaActualizacion: Date;
}