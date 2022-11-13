import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { LoginInputDto, LoginResponseDto } from '@DTOs';

import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  async login(@Args('input') input: LoginInputDto): Promise<LoginResponseDto> {
    return this.authService.login(input);
  }
}
