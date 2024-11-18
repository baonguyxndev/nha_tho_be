import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';

import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@/middleware/passport/jwt-auth.guard';
import { LocalAuthGuard } from '@/middleware/passport/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  create(@Request() req) {
    return this.authService.login(req.admin);
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.admin;
  }

}
