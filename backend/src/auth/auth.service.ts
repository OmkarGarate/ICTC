import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  /*
  -----------------------------------
  Generate Access + Refresh Tokens
  -----------------------------------
  */
 async generateTokens(user: User) {

  const payload = {
    sub: user.id,
    username: user.username,
  };

  const access_token = await this.jwtService.signAsync(payload, {
    secret: this.config.get<string>('JWT_ACCESS_SECRET')!,
    expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRY') as any,
  });

  const refresh_token = await this.jwtService.signAsync(payload, {
    secret: this.config.get<string>('JWT_REFRESH_SECRET')!,
    expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRY') as any,
  });

  return {
    access_token,
    refresh_token,
  };
}

  /*
  -----------------------------------
  Register User
  -----------------------------------
  */
  async register(dto: RegisterDto) {

    const existingUser = await this.userRepo.findOne({
      where: { username: dto.username },
    });

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const saltRounds = Number(
  this.config.get<string>('BCRYPT_SALT_ROUNDS'),
) || 10;

    const hashedPassword = await bcrypt.hash(
      dto.password,
      saltRounds,
    );

    const user = this.userRepo.create({
      username: dto.username,
      password: hashedPassword,
    });

    return await this.userRepo.save(user);
  }

  /*
  -----------------------------------
  Login
  -----------------------------------
  */
  async login(dto: LoginDto) {

    const user = await this.userRepo.findOne({
      where: {
        username: dto.username,
        is_deleted: 0,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid username or password',
      );
    }

    const match = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!match) {
      throw new UnauthorizedException(
        'Invalid username or password',
      );
    }

    const tokens = await this.generateTokens(user);

    return tokens;
  }

  /*
  -----------------------------------
  Refresh Access Token
  -----------------------------------
  */
  async refreshToken(refreshToken: string) {

    try {

      const payload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.config.get<string>('JWT_REFRESH_SECRET')!,
        },
      );

      const user = await this.userRepo.findOne({
        where: {
          id: payload.sub,
          is_deleted: 0,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const newAccessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.username,
        },
        {
          secret: this.config.get<string>('JWT_ACCESS_SECRET')!,
          expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRY') as any,
        },
      );

      return {
        access_token: newAccessToken,
      };

    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

}