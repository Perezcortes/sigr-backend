// src/rentals/entities/guarantor.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { GuarantorPropertyGuarantee } from './guarantor-property-guarantee.entity';
import { GuarantorEmploymentIncomePf } from './guarantor-employment-income-pf.entity';
import { GuarantorLegalRepresentative } from './guarantor-legal-representative.entity';

@Entity('obligados_solidarios')
export class Guarantor {
    @PrimaryGeneratedColumn()
    id: number;

    // Campos comunes a ambos tipos (PF y PM)
    @Column({ name: 'tipo_persona' })
    tipo_persona: 'PF' | 'PM';

    @Column({ name: 'relacion_solicitante', nullable: true })
    relacion_solicitante?: string;

    @Column({ name: 'tiempo_conociendolo', nullable: true })
    tiempo_conociendolo?: string;

    @Column({ name: 'nombre', nullable: true })
    nombre?: string;

    @Column({ name: 'apellido_p', nullable: true })
    apellido_p?: string;

    @Column({ name: 'apellido_m', nullable: true })
    apellido_m?: string;

    @Column({ name: 'rfc', nullable: true })
    rfc?: string;

    @Column({ name: 'email', nullable: true })
    email?: string;
    
    @Column({ name: 'tel_cel', nullable: true })
    tel_cel?: string;

    @Column({ name: 'tel_fijo', nullable: true })
    tel_fijo?: string;

    // Domicilio donde vive actualmente
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
    
    // Relaciones con las entidades de apoyo
    
    // Relación con los datos de empleo e ingresos (solo para PF)
    @OneToOne(() => GuarantorEmploymentIncomePf, (empleo) => empleo.guarantor, { cascade: true, nullable: true })
    @JoinColumn({ name: 'empleo_ingresos_pf_id' })
    empleo_ingresos_pf?: GuarantorEmploymentIncomePf;

    // Relación con el representante legal (solo para PM)
    @OneToOne(() => GuarantorLegalRepresentative, (rep) => rep.guarantor, { cascade: true, nullable: true })
    @JoinColumn({ name: 'representante_legal_id' })
    representante_legal?: GuarantorLegalRepresentative;

    // Relación con la propiedad en garantía (aplica para ambos)
    @OneToOne(() => GuarantorPropertyGuarantee, (prop) => prop.guarantor, { cascade: true, nullable: true })
    @JoinColumn({ name: 'propiedad_garantia_id' })
    propiedad_garantia?: GuarantorPropertyGuarantee;
    
    // Columnas automáticas de TypeORM
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}