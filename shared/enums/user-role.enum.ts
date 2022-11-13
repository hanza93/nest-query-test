import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  admin = 'admin',
  lender = 'lender',
  broker = 'broker',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
