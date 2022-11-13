import { AdvocateEntity } from '@app/advocate-base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { UserRole } from 'shared/enums/user-role.enum';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType('User')
@KeySet(['id'])
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
})
// don't extends AdvocateEntity because we don't want to track createdBy and updatedBy
export class UserDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @FilterableField(() => UserRole)
  role: UserRole;

  @Field()
  email: string;

  @FilterableField()
  firstName: string;

  @FilterableField()
  lastName: string;

  @FilterableField()
  fullName: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt!: Date;
}
