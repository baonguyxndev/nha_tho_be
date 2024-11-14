
import { comparePasswordHelper } from '@/helpers/util';
import { AdminService } from '@/modules/admin/service/admin.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findByEmail(email);
    const isValidPassword = comparePasswordHelper(password, admin.password);
    if (!isValidPassword)
      throw new UnauthorizedException("Email/Password không hợp lệ");
    const payload = { sub: admin._id, email: admin.email };
    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }
}
