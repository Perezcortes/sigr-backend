// src/rentals/entities/property.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Owner } from './owner.entity';

@Entity('propiedades')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  tipo?: string;

  @Column({ nullable: true, name: 'calle' })
  calle?: string;

  @Column({ nullable: true, name: 'numero' })
  num_ext?: string;

  @Column({ nullable: true, name: 'num_int' })
  num_int?: string;
  
  @Column({ nullable: true, name: 'referencias_ubicacion' })
  referencias_ubicacion?: string;

  @Column({ nullable: true, name: 'colonia' })
  colonia?: string;

  @Column({ nullable: true, name: 'municipio' })
  municipio?: string;
  
  @Column({ nullable: true, name: 'estado' })
  estado?: string;
  
  @Column({ nullable: true, name: 'codigo_postal' })
  codigo_postal?: string;

  @Column({ name: 'metros_cuadrados', type: 'decimal', precision: 10, scale: 2, nullable: true })
  metros_cuadrados?: number;

  @Column({ name: 'monto_renta', type: 'decimal', precision: 10, scale: 2, nullable: true })
  monto_renta?: number;
  
  // Nuevos campos del propietario
  @Column({ name: 'pago_renta_forma', nullable: true })
  pago_renta_forma?: string;

  @Column({ name: 'pago_renta_otro_metodo', nullable: true })
  pago_renta_otro_metodo?: string;

  @Column({ name: 'pago_renta_titular_cuenta', nullable: true })
  pago_renta_titular_cuenta?: string;
  
  @Column({ name: 'pago_renta_num_cuenta', nullable: true })
  pago_renta_num_cuenta?: string;

  @Column({ name: 'pago_renta_banco', nullable: true })
  pago_renta_banco?: string;

  @Column({ name: 'pago_renta_clabe', nullable: true })
  pago_renta_clabe?: string;
  
  @Column({ name: 'uso_suelo', nullable: true })
  uso_suelo?: string;
  
  @Column({ name: 'mascotas_permitidas', nullable: true })
  mascotas_permitidas?: string;

  @Column({ name: 'mascotas_especificacion', nullable: true })
  mascotas_especificacion?: string;
  
  @Column({ name: 'iva_en_renta', nullable: true })
  iva_en_renta?: string;

  @Column({ name: 'frecuencia_pago', nullable: true })
  frecuencia_pago?: string;

  @Column({ name: 'frecuencia_pago_otra', nullable: true })
  frecuencia_pago_otra?: string;
  
  @Column({ name: 'condiciones_pago', type: 'text', nullable: true })
  condiciones_pago?: string;

  @Column({ name: 'deposito_garantia', type: 'decimal', precision: 12, scale: 2, nullable: true })
  deposito_garantia?: number;
  
  @Column({ name: 'paga_mantenimiento', nullable: true })
  paga_mantenimiento?: string;

  @Column({ name: 'quien_paga_mantenimiento', nullable: true })
  quien_paga_mantenimiento?: string;

  @Column({ name: 'mantenimiento_incluido', nullable: true })
  mantenimiento_incluido?: string;
  
  @Column({ name: 'costo_mantenimiento_mensual', type: 'decimal', precision: 12, scale: 2, nullable: true })
  costo_mantenimiento_mensual?: number;
  
  @Column({ name: 'instrucciones_pago', type: 'text', nullable: true })
  instrucciones_pago?: string;
  
  @Column({ name: 'requiere_seguro', nullable: true })
  requiere_seguro?: string;

  @Column({ name: 'cobertura_seguro', nullable: true })
  cobertura_seguro?: string;
  
  @Column({ name: 'monto_cobertura_seguro', type: 'decimal', precision: 12, scale: 2, nullable: true })
  monto_cobertura_seguro?: number;
  
  @Column({ name: 'servicios_a_pagar', type: 'text', nullable: true })
  servicios_a_pagar?: string;

  @Column({ name: 'inventario', type: 'text', nullable: true })
  inventario?: string;

  @Column({ name: 'propietario_id', nullable: true })
  propietario_id?: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  // Relaciones
  @ManyToOne(() => Owner)
  @JoinColumn({ name: 'propietario_id' })
  propietario: Owner;
}