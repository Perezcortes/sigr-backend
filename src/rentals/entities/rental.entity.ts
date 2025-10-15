import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Tenant } from "./tenant.entity";
import { Owner } from "./owner.entity";
import { Guarantor } from "./guarantor.entity";
import { Property } from "./property.entity";

@Entity("rental")
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ name: "tipo_origen" })
  tipo_origen: string;

  @Column({ name: "inquilino_id" })
  inquilino_id: number;

  @Column({ name: "propietario_id" })
  propietario_id: number;

  @Column({ name: "obligado_solidario_id", nullable: true })
  obligado_solidario_id?: number;

  @Column({ name: "propiedad_id" })
  propiedad_id: number;

  @Column({ name: "creado_por_user_id" })
  creado_por_user_id: number;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date;

  // Relaciones
  @OneToOne(() => Tenant)
  @JoinColumn({ name: "inquilino_id" })
  inquilino: Tenant;

  @OneToOne(() => Owner)
  @JoinColumn({ name: "propietario_id" })
  propietario: Owner;

@OneToOne(() => Guarantor, { nullable: true })
@JoinColumn({ name: 'obligado_solidario_id' })
obligado_solidario?: Guarantor;

  @OneToOne(() => Property)
  @JoinColumn({ name: "propiedad_id" })
  propiedad: Property;

  @ManyToOne(() => User)
  @JoinColumn({ name: "creado_por_user_id" })
  creado_por_user: User; // Renombrada a 'creado_por_user'
}
