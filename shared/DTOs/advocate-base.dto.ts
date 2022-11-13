import { ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('AdvocateBaseDto')
export class AdvocateBaseDto {
  @IDField(() => ID)
  id: string;

  @FilterableField()
  createdAt: Date;

  @FilterableField()
  updatedAt: Date;

  @FilterableField()
  createdBy: string;

  @FilterableField()
  updateBy: string;
}
