import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { UserRole } from 'shared/enums/user-role.enum';
import { AdvocateBaseCreateDto } from '../advocate-base-create.dto';

@InputType('CreateUserDto')
export class CreateUserDto extends AdvocateBaseCreateDto {
  @IsEnum(UserRole)
  @Field(() => UserRole)
  role: UserRole;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
    message: 'Password too weak',
  })
  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
