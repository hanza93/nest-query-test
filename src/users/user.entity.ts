import { AdvocateEntity } from '@app/advocate-base.entity';
import { Exclude } from 'class-transformer';
import { UserRole } from 'shared/enums/user-role.enum';
import { BeforeUpdate, Column, Entity, Index } from 'typeorm';
import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

@Entity({ name: 'users' })
export class UserEntity extends AdvocateEntity {
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

  @BeforeUpdate()
  async UpdateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

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
