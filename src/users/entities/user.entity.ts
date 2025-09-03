import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcrypt";
import { Role } from "../../roles/entities/role.entity";
import { Office } from "../../offices/entities/office.entity";
import { RefreshToken } from "../../auth/entities/refresh-token.entity";

@Entity("users")
export class User {
  @ApiProperty({
    description: "ID único del usuario",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    description: "Email del usuario",
    example: "usuario@rentas.com",
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: "Nombre de usuario",
    example: "juanperez",
    required: false,
  })
  @Column({ unique: true, nullable: true, length: 100 })
  username?: string;

  @Exclude()
  @Column()
  password_hash: string;

  @ApiProperty({
    description: "Nombre(s) del usuario",
    example: "Juan",
  })
  @Column({ length: 100 })
  first_name: string;

  @ApiProperty({
    description: "Apellidos del usuario",
    example: "Pérez García",
  })
  @Column({ length: 100 })
  last_name: string;

  @ApiProperty({
    description: "Nombre completo del usuario",
    example: "Juan Pérez García",
  })
  @Column({
    type: "varchar",
    length: 200,
    generatedType: "STORED",
    asExpression: `first_name || ' ' || last_name`,
  })
  full_name: string;

  @ApiProperty({
    description: "Teléfono del usuario",
    example: "+52 55 1234 5678",
    required: false,
  })
  @Column({ length: 20, nullable: true })
  phone?: string;

  @ApiProperty({
    description: "URL del avatar del usuario",
    example: "https://example.com/avatar.jpg",
    required: false,
  })
  @Column({ type: "text", nullable: true })
  avatar_url?: string;

  @ApiProperty({
    description: "Estado del usuario",
    example: true,
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: "Indica si el usuario está verificado",
    example: false,
  })
  @Column({ default: false })
  is_verified: boolean;

  @ApiProperty({
    description: "Fecha de verificación del email",
    required: false,
  })
  @Column({ type: "timestamp", nullable: true })
  email_verified_at?: Date;

  @ApiProperty({
    description: "Fecha del último login",
    required: false,
  })
  @Column({ type: "timestamp", nullable: true })
  last_login_at?: Date;

  @ApiProperty({
    description: "Fecha del último cambio de contraseña",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  password_changed_at: Date;

  @ApiProperty({
    description: "Intentos fallidos de login",
    example: 0,
  })
  @Column({ default: 0 })
  failed_login_attempts: number;

  @ApiProperty({
    description: "Fecha hasta la cual el usuario está bloqueado",
    required: false,
  })
  @Column({ type: "timestamp", nullable: true })
  locked_until?: Date;

  @ApiProperty({
    description: "Indica si tiene 2FA habilitado",
    example: false,
  })
  @Column({ default: false })
  two_factor_enabled: boolean;

  @Exclude()
  @Column({ nullable: true })
  two_factor_secret?: string;

  @ApiProperty({
    description: "Fecha de creación",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: "Fecha de última actualización",
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    description: "Fecha de eliminación (soft delete)",
    required: false,
  })
  @DeleteDateColumn()
  deleted_at?: Date;

  // Relaciones
  @Column()
  role_id: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: "role_id" })
  role: Role;

  @Column({ nullable: true })
  office_id?: string;

  @ManyToOne(() => Office, (office) => office.users, { eager: true })
  @JoinColumn({ name: "office_id" })
  office?: Office;

  @Column({ nullable: true })
  created_by?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "created_by" })
  creator?: User;

  @Column({ nullable: true })
  updated_by?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updater?: User;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refresh_tokens: RefreshToken[];

  // Métodos de utilidad
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password_hash && !this.password_hash.startsWith("$2b$")) {
      this.password_hash = await bcrypt.hash(this.password_hash, 12);
      this.password_changed_at = new Date();
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash);
  }

  isLocked(): boolean {
    return !!(this.locked_until && this.locked_until > new Date());
  }

  // Método para obtener datos públicos (sin información sensible)
  toPublic() {
    const { password_hash, two_factor_secret, ...publicData } = this;
    return {
      ...publicData,
      permissions: this.role?.permissions?.map((p) => p.name) || [],
    };
  }
}
