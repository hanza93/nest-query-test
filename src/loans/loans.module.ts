import { CreateLoanDto, LoanDto, UpdateLoanDto } from '@DTOs';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { LoanEntity } from './loan.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([LoanEntity])],
      resolvers: [
        {
          DTOClass: LoanDto,
          EntityClass: LoanEntity,
          CreateDTOClass: CreateLoanDto,
          UpdateDTOClass: UpdateLoanDto,
        },
      ],
    }),
  ],
})
export class LoansModule {}
