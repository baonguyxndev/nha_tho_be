import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '../controller/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
