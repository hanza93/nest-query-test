import { UserDto } from '@DTOs';

export type AuthenticatedUser = UserDto & { accessToken: string };

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
