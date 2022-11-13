import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '@users/users.service';
import { UsersErrors } from '@errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UsersService) private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 60 * 60 * 7, // 7 days
      },
    });
  }

  async validate(payload: { id: string; username: string }) {
    const { id } = payload;
    const user = await this.usersService.findById(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException(UsersErrors.unauthorized);
    }
  }
}
