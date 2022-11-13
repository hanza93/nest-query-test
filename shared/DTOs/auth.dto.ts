import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import { UserDto } from './users';

@InputType()
export class LoginInputDto {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
    message: 'Password too weak',
  })
  @Field()
  password!: string;
}

@ObjectType('LoginResponse')
export class LoginResponseDto {
  @Field()
  accessToken!: string;

  @Field()
  user: UserDto;
}
