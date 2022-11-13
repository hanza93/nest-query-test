import { CreateUserDto, UpdateUserDto, UserDto } from '@DTOs';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      services: [UsersService],
      resolvers: [
        {
          DTOClass: UserDto,
          EntityClass: UserEntity,
          CreateDTOClass: CreateUserDto,
          UpdateDTOClass: UpdateUserDto,
          ServiceClass: UsersService,
        },
      ],
    }),
  ],
})
export class UsersModule {}
