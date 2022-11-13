import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from './create-user.dto';

@InputType('UpdateUserDto')
export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'email',
  'password',
] as const) {}
