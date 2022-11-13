import { AdvocateEntity } from '@app/advocate-base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { UserRole } from 'shared/enums/user-role.enum';

@ObjectType('User')
@KeySet(['id'])
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
})
export class UserDto extends AdvocateEntity {
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
}
