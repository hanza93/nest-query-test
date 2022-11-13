import { LoanStatus } from '@enums';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { AdvocateBaseDto } from '../advocate-base.dto';

@ObjectType('Loan')
@KeySet(['id'])
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
})
export class LoanDto extends AdvocateBaseDto {
  @FilterableField()
  sequence: number;

  @Field()
  tenor: number;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  closedAt?: Date;

  @FilterableField()
  ref: string;

  @FilterableField()
  title: string;

  @FilterableField(() => LoanStatus)
  status: LoanStatus;
}
