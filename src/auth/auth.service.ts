import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UsersErrors } from '@errors';
import { LoginInputDto, LoginResponseDto, UserDto } from '@DTOs';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(credentials: LoginInputDto): Promise<LoginResponseDto> {
    const [user] = await this.usersService.query({
      filter: { email: { eq: credentials.email } },
      paging: { limit: 1 },
    });
    if (!user || !(await user.validatePassword(credentials.password))) {
      throw new UnauthorizedException(UsersErrors.invalidCredentials);
    }
    const accessToken = await this._generateToken(user);
    return { accessToken, user: user };
  }

  async _generateToken(user: UserDto): Promise<string> {
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        secret: this.configService.get('JWT_SECRET_KEY'),
      },
    );
  }
}
