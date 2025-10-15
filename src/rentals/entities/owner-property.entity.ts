// src/rentals/entities/owner-property.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Owner } from './owner.entity';

@Entity('owner_property')
export class OwnerProperty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'tipo_inmueble', nullable: true })
    tipo_inmueble?: string;

    @Column({ name: 'uso_suelo', nullable: true })
    uso_suelo?: string;

    @Column({ name: 'mascotas', nullable: true })
    mascotas?: boolean;

    @Column({ name: 'especificacion_mascotas', nullable: true })
    especificacion_mascotas?: string;

    @Column({ name: 'precio_renta', type: 'decimal', precision: 12, scale: 2, nullable: true })
    precio_renta?: number;

    @Column({ name: 'iva_renta', nullable: true })
    iva_renta?: string;

    @Column({ name: 'frecuencia_pago', nullable: true })
    frecuencia_pago?: string;

    @Column({ name: 'condiciones_pago', nullable: true })
    condiciones_pago?: string;

    @Column({ name: 'paga_mantenimiento', nullable: true })
    paga_mantenimiento?: boolean;

    @Column({ name: 'quien_paga_mantenimiento', nullable: true })
    quien_paga_mantenimiento?: string;

    @Column({ name: 'costo_mantenimiento', type: 'decimal', precision: 12, scale: 2, nullable: true })
    costo_mantenimiento?: number;

    @Column({ name: 'requiere_seguro', nullable: true })
    requiere_seguro?: boolean;

    @Column({ name: 'cobertura_seguro', nullable: true })
    cobertura_seguro?: string;
    
    @Column({ name: 'monto_seguro', type: 'decimal', precision: 12, scale: 2, nullable: true })
    monto_seguro?: number;

    @Column({ name: 'deposito_garantia', type: 'decimal', precision: 12, scale: 2, nullable: true })
    deposito_garantia?: number;

    @Column({ name: 'deposito_en_renta', nullable: true })
    deposito_en_renta?: boolean;
    
    @Column({ name: 'servicios_pago', nullable: true })
    servicios_pago?: string;
    
    @Column({ name: 'instrucciones_pago', nullable: true })
    instrucciones_pago?: string;

    // Domicilio del inmueble
    @Column({ name: 'inm_calle', nullable: true })
    inm_calle?: string;
    @Column({ name: 'inm_num_ext', nullable: true })
    inm_num_ext?: string;
    @Column({ name: 'inm_num_int', nullable: true })
    inm_num_int?: string;
    @Column({ name: 'inm_cp', nullable: true })
    inm_cp?: string;
    @Column({ name: 'inm_colonia', nullable: true })
    inm_colonia?: string;
    @Column({ name: 'inm_del_mun', nullable: true })
    inm_del_mun?: string;
    @Column({ name: 'inm_estado', nullable: true })
    inm_estado?: string;
    @Column({ name: 'inm_referencias', nullable: true })
    inm_referencias?: string;

    @Column({ name: 'inventario', nullable: true })
    inventario?: string;

    @OneToOne(() => Owner, (owner) => owner.property)
    owner: Owner;
}