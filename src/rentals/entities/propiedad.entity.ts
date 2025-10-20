import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Rental } from './rental.entity';

@Entity('propiedades')
export class Propiedad {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único de la propiedad' })
  id: string;

  @OneToOne(() => Rental)
  @JoinColumn({ name: 'renta_id' })
  renta: Rental;

  @Column({ name: 'renta_id' })
  rentaId: string;

  @Column({ type: 'enum', enum: ['casa', 'departamento', 'local_comercial', 'oficina', 'bodega', 'nave_industrial', 'consultorio', 'terreno'] })
  @ApiProperty({ enum: ['casa', 'departamento', 'local_comercial', 'oficina', 'bodega', 'nave_industrial', 'consultorio', 'terreno'], description: 'Tipo de propiedad' })
  tipoPropiedad: string;

  // Dirección de la Propiedad
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

  // Datos del Inmueble
  @Column({ name: 'uso_suelo', type: 'enum', enum: ['habitacional', 'comercial', 'industrial'] })
  @ApiProperty({ enum: ['habitacional', 'comercial', 'industrial'], description: 'Uso de suelo' })
  usoSuelo: string;

  @Column({ name: 'permite_mascotas' })
  @ApiProperty({ description: '¿Permite mascotas?' })
  permiteMascotas: boolean;

  @Column({ name: 'mascotas_especifique', nullable: true })
  @ApiProperty({ description: 'Especifique mascotas', nullable: true })
  mascotasEspecifique?: string;

  @Column({ name: 'precio_renta', type: 'decimal', precision: 12, scale: 2 })
  @ApiProperty({ description: 'Precio de renta' })
  precioRenta: number;

  @Column({ name: 'iva_renta', type: 'enum', enum: ['incluido', 'mas_iva', 'sin_iva'] })
  @ApiProperty({ enum: ['incluido', 'mas_iva', 'sin_iva'], description: 'IVA en la renta' })
  ivaRenta: string;

  @Column({ name: 'frecuencia_pago', type: 'enum', enum: ['mensual', 'semanal', 'quincenal', 'semestral', 'anual', 'otra'] })
  @ApiProperty({ enum: ['mensual', 'semanal', 'quincenal', 'semestral', 'anual', 'otra'], description: 'Frecuencia de pago' })
  frecuenciaPago: string;

  @Column({ name: 'otra_frecuencia', nullable: true })
  @ApiProperty({ description: 'Otra frecuencia', nullable: true })
  otraFrecuencia?: string;

  @Column({ name: 'condiciones_pago', type: 'text' })
  @ApiProperty({ description: 'Condiciones de pago' })
  condicionesPago: string;

  @Column({ name: 'deposito_garantia', type: 'decimal', precision: 12, scale: 2 })
  @ApiProperty({ description: 'Depósito en garantía' })
  depositoGarantia: number;

  @Column({ name: 'paga_mantenimiento' })
  @ApiProperty({ description: '¿Se paga mantenimiento?' })
  pagaMantenimiento: boolean;

  @Column({ name: 'quien_paga_mantenimiento', nullable: true })
  @ApiProperty({ description: '¿Quién paga mantenimiento?', nullable: true })
  quienPagaMantenimiento?: string;

  @Column({ name: 'mantenimiento_incluido', nullable: true })
  @ApiProperty({ description: '¿Mantenimiento incluido?', nullable: true })
  mantenimientoIncluido?: boolean;

  @Column({ name: 'costo_mantenimiento', type: 'decimal', precision: 12, scale: 2, nullable: true })
  @ApiProperty({ description: 'Costo de mantenimiento', nullable: true })
  costoMantenimiento?: number;

  @Column({ name: 'instrucciones_pago', type: 'text', nullable: true })
  @ApiProperty({ description: 'Instrucciones de pago', nullable: true })
  instruccionesPago?: string;

  @Column({ name: 'requiere_seguro' })
  @ApiProperty({ description: '¿Requiere seguro?' })
  requiereSeguro: boolean;

  @Column({ name: 'cobertura_seguro', type: 'text', nullable: true })
  @ApiProperty({ description: 'Cobertura del seguro', nullable: true })
  coberturaSeguro?: string;

  @Column({ name: 'monto_seguro', type: 'decimal', precision: 12, scale: 2, nullable: true })
  @ApiProperty({ description: 'Monto del seguro', nullable: true })
  montoSeguro?: number;

  @Column({ name: 'servicios_pagar', type: 'text', nullable: true })
  @ApiProperty({ description: 'Servicios a pagar', nullable: true })
  serviciosPagar?: string;

  @Column({ name: 'inventario', type: 'text', nullable: true })
  @ApiProperty({ description: 'Inventario', nullable: true })
  inventario?: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  @ApiProperty({ description: 'Fecha de creación' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  @ApiProperty({ description: 'Fecha de última actualización' })
  fechaActualizacion: Date;
}