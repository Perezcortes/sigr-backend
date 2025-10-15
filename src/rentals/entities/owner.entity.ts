// src/rentals/entities/owner.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OwnerBankInfo } from './owner-bank-info.entity';
import { OwnerProperty } from './owner-property.entity';
import { OwnerLegalRepresentative } from './owner-legal-representative.entity';

@Entity('propietarios')
export class Owner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'tipo_persona' })
    tipo_persona: 'PF' | 'PM';

    @Column({ name: 'nombre', nullable: true })
    nombre?: string;

    @Column({ name: 'apellido_p', nullable: true })
    apellido_p?: string;

    @Column({ name: 'apellido_m', nullable: true })
    apellido_m?: string;

    @Column({ name: 'curp', nullable: true })
    curp?: string;
    
    @Column({ name: 'rfc', nullable: true })
    rfc?: string;

    @Column({ name: 'email', nullable: true })
    email?: string;
    
    @Column({ name: 'telefono', nullable: true })
    telefono?: string;

    // Domicilio del propietario
    @Column({ name: 'dom_calle', nullable: true })
    dom_calle?: string;
    @Column({ name: 'dom_num_ext', nullable: true })
    dom_num_ext?: string;
    @Column({ name: 'dom_num_int', nullable: true })
    dom_num_int?: string;
    @Column({ name: 'dom_cp', nullable: true })
    dom_cp?: string;
    @Column({ name: 'dom_colonia', nullable: true })
    dom_colonia?: string;
    @Column({ name: 'dom_del_mun', nullable: true })
    dom_del_mun?: string;
    @Column({ name: 'dom_estado', nullable: true })
    dom_estado?: string;
    @Column({ name: 'dom_referencias', nullable: true })
    dom_referencias?: string;

    // Relaciones
    @OneToOne(() => OwnerBankInfo, (bankInfo) => bankInfo.owner, { cascade: true, nullable: true })
    @JoinColumn({ name: 'bank_info_id' })
    bank_info?: OwnerBankInfo;

    @OneToOne(() => OwnerProperty, (property) => property.owner, { cascade: true, nullable: true })
    @JoinColumn({ name: 'property_id' })
    property?: OwnerProperty;
    
    @OneToOne(() => OwnerLegalRepresentative, (rep) => rep.owner, { cascade: true, nullable: true })
    @JoinColumn({ name: 'legal_representative_id' })
    legal_representative?: OwnerLegalRepresentative;

    // Columnas automáticas
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}