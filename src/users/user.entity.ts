import { AdvocateEntity } from '@app/advocate-base.entity';
import { Exclude } from 'class-transformer';
import { UserRole } from 'shared/enums/user-role.enum';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

// don't extends AdvocateEntity because we don't want to track createdBy and updatedBy
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt!: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.lender,
  })
  role: UserRole;

  @Index('unique_email', { unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column({ default: '' })
  @Exclude()
  tempPassword: string;

  @BeforeInsert()
  @BeforeUpdate()
  async UpdateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async updatePassowrd() {
    if (this.tempPassword !== this.password) {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
      this.tempPassword = this.password;
    }
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}
