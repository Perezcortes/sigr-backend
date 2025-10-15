// src/rentals/entities/owner-bank-info.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Owner } from './owner.entity';

@Entity('owner_bank_info')
export class OwnerBankInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'titular_cuenta', nullable: true })
    titular_cuenta?: string;

    @Column({ name: 'numero_cuenta', nullable: true })
    numero_cuenta?: string;

    @Column({ name: 'nombre_banco', nullable: true })
    nombre_banco?: string;

    @Column({ name: 'clabe_interbancaria', nullable: true })
    clabe_interbancaria?: string;

    @OneToOne(() => Owner, (owner) => owner.bank_info)
    owner: Owner;
}