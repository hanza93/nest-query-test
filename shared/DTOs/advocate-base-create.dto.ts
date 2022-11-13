import { InputType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';

@BeforeCreateOne(
  (input: CreateOneInputType<AdvocateBaseCreateDto>, context: any) => {
    input.input.createdBy = 'some id here!';
    return input;
  },
)
@BeforeUpdateOne(
  (input: UpdateOneInputType<AdvocateBaseCreateDto>, context: any) => {
    input.update.createdBy = 'some id here!';
    return input;
  },
)
@InputType('AdvocateBaseCreateDto')
export class AdvocateBaseCreateDto {
  createdBy: string;
  updatedBy: string;
}
