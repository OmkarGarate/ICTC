import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { ConfigService } from '@nestjs/config';
import type { Request as ExpressRequest, Response } from 'express';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    return user;
  }

  @Post('logout')
  logout(
    @Res({ passthrough: true })
    res: Response,
  ) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return {
      message: 'Logged out successfully',
    };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Request() req) {
    return req.user;
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(dto);

    const secure = this.configService.get<string>('COOKIE_SECURE') === 'true';
    const sameSite = this.configService.get<string>('COOKIE_SAMESITE') as any;

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure,
      sameSite,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure,
      sameSite,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      message: 'Login successful',
    };
  }

  /**
   * POST /auth/refresh
   *
   * Reads the refresh_token from the httpOnly cookie (NOT from the request body).
   * On success, sets a new access_token cookie and returns 200.
   * The frontend axios interceptor calls this automatically on any 401.
   */
  @Post('refresh')
  async refresh(
    @Req() req: ExpressRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = (req.cookies as any)?.refresh_token;

    const result = await this.authService.refreshToken(refreshToken);

    const secure = this.configService.get<string>('COOKIE_SECURE') === 'true';
    const sameSite = this.configService.get<string>('COOKIE_SAMESITE') as any;

    // Set the new access_token as a cookie so the browser sends it automatically
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure,
      sameSite,
      maxAge: 15 * 60 * 1000,
    });

    return { message: 'Token refreshed' };
  }
}