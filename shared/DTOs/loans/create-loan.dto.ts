import { LoanStatus } from '@enums';
import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { AdvocateBaseCreateDto } from '../advocate-base-create.dto';

@InputType('CreateLoanDto')
export class CreateLoanDto extends AdvocateBaseCreateDto {
  @IsNumber()
  @Min(0)
  @Field()
  tenor: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  ref: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;
}
