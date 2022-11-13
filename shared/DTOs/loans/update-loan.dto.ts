import { LoanStatus } from '@enums';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CreateLoanDto } from './create-loan.dto';

@InputType('UpdateLoanDto')
export class UpdateLoanDto extends PartialType(CreateLoanDto) {
  @IsEnum(LoanStatus)
  @Field(() => LoanStatus)
  status: LoanStatus;
}
