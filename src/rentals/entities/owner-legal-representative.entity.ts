// src/rentals/entities/owner-legal-representative.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Owner } from './owner.entity';

@Entity('owner_legal_representative')
export class OwnerLegalRepresentative {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre', nullable: true })
    nombre?: string;
    @Column({ name: 'apellido_p', nullable: true })
    apellido_p?: string;
    @Column({ name: 'apellido_m', nullable: true })
    apellido_m?: string;
    @Column({ name: 'sexo', nullable: true })
    sexo?: string;
    @Column({ name: 'rfc', nullable: true })
    rfc?: string;
    @Column({ name: 'curp', nullable: true })
    curp?: string;
    @Column({ name: 'email', nullable: true })
    email?: string;
    @Column({ name: 'telefono', nullable: true })
    telefono?: string;
    @Column({ name: 'id_tipo', nullable: true })
    id_tipo?: string;

    // Domicilio del representante
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

    @OneToOne(() => Owner, (owner) => owner.legal_representative)
    owner: Owner;
}