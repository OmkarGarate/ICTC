import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly config: ConfigService,
  ) {

    super({

      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {

          if (!req) {
            return null;
          }

          return req.cookies?.access_token;
        },
      ]),

      ignoreExpiration: false,

      secretOrKey:
        config.get<string>('JWT_ACCESS_SECRET')!,
    });
  }

  async validate(payload: any) {

    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}