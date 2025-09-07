// src/auth/entities/refresh-token.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: number; // Cambiado a number para coincidir con User.id

  @ManyToOne(() => User, (user) => user.refresh_tokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ unique: true })
  token_hash: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column({ default: false })
  is_revoked: boolean;

  @Column({ type: 'jsonb', nullable: true })
  device_info?: any;

  @Column({ type: 'inet', nullable: true })
  ip_address?: string;

  @Column({ type: 'text', nullable: true })
  user_agent?: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  revoked_at?: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_used_at?: Date;

  @BeforeInsert()
  async hashToken() {
    if (this.token_hash && !this.token_hash.startsWith('$2b$')) {
      this.token_hash = await bcrypt.hash(this.token_hash, 12);
    }
  }

  async validateToken(token: string): Promise<boolean> {
    return bcrypt.compare(token, this.token_hash);
  }

  isExpired(): boolean {
    return this.expires_at < new Date();
  }

  isValid(): boolean {
    return !this.is_revoked && !this.isExpired();
  }
}