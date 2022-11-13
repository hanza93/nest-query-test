import { CreateLoanDto, LoanDto, UpdateLoanDto } from '@DTOs';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { loanEntity } from './loan.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([loanEntity])],
      resolvers: [
        {
          DTOClass: LoanDto,
          EntityClass: loanEntity,
          CreateDTOClass: CreateLoanDto,
          UpdateDTOClass: UpdateLoanDto,
        },
      ],
    }),
  ],
})
export class LoansModule {}
