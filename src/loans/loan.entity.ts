import { AdvocateEntity } from '@app/advocate-base.entity';
import { LoanStatus } from '@enums';
import { BeforeUpdate, Column, Entity, Generated } from 'typeorm';

@Entity({ name: 'loans' })
export class LoanEntity extends AdvocateEntity {
  @Column()
  @Generated('increment')
  sequence: number;

  @Column()
  tenor: number;

  @Column({ nullable: true })
  closedAt: Date;

  @Column()
  ref: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: LoanStatus,
    default: LoanStatus.draft,
  })
  status: LoanStatus;

  oldStatus: LoanStatus;

  @BeforeUpdate()
  async UpdateCloseAt() {
    if (this.status === LoanStatus.closed && this.oldStatus !== this.status) {
      this.closedAt = new Date();
    }
    this.oldStatus = this.status;
  }
}
