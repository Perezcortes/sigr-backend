import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, OneToMany, JoinColumn, JoinTable, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "../../roles/entities/role.entity";
import { Office } from "../../offices/entities/office.entity";
import { RefreshToken } from "../../auth/entities/refresh-token.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  nombres: string;

  @Column({ type: "varchar" })
  primer_apellido: string;

  @Column({ type: "varchar", nullable: true })
  segundo_apellido: string | null;

  @Column({ type: "varchar", unique: true })
  correo: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  telefono: string | null;

  @Column({ type: "varchar", length: 10, nullable: true })
  whatsapp: string | null;

  @Column({ type: "varchar" })
  password: string;

  @Column({ name: "role_id" })
  role_id: number;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @Column({ type: "int", default: 0 })
  failed_login_attempts: number;

  @Column({ type: "timestamp", nullable: true })
  locked_until: Date | null;

  @Column({ type: "timestamp", nullable: true })
  last_login_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date; // Relaciones

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  @JoinColumn({ name: "role_id" })
  role: Role;

  @ManyToMany(() => Office, (office) => office.users)
  @JoinTable({
    name: "office_user",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "office_id", referencedColumnName: "id" },
  })
  offices: Office[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refresh_tokens: RefreshToken[]; // Getters para compatibilidad con AuthService

  get email(): string {
    return this.correo;
  }

  get password_hash(): string {
    return this.password;
  }

  set password_hash(value: string) {
    this.password = value;
  }

  get full_name(): string {
    const segundo = this.segundo_apellido ? ` ${this.segundo_apellido}` : "";
    return `${this.nombres} ${this.primer_apellido}${segundo}`;
  }

  get office(): Office | undefined {
    return this.offices?.[0]; // Primera oficina como oficina principal
  }

  get office_id(): number | undefined {
    return this.offices?.[0]?.id;
  } // Métodos para autenticación

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith("$2b$")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  isLocked(): boolean {
    return this.locked_until ? this.locked_until > new Date() : false;
  }

  toPublic() {
    return {
      id: this.id.toString(), // Convertir a string para compatibilidad
      email: this.email,
      name: this.full_name,
      role: this.role?.nombre?.toLowerCase(), // CORRECCIÓN: Usar 'nombre' de la entidad Role
      oficina: this.office?.nombre, // CORRECCIÓN: Usar 'nombre' de la entidad Office
      permissions: this.role?.permissions?.map((p) => p.name) || [],
      isActive: this.is_active,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
