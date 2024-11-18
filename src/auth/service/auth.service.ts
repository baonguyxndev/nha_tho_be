import { comparePasswordHelper } from '@/helpers/util';
import { AdminService } from '@/modules/admin/service/admin.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) { }


  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findByEmail(email);
    const isValidPassword = comparePasswordHelper(password, admin.password);
    if (!admin || !isValidPassword)
      return null;
    return admin;
  }

  async login(admin: any) {
    const payload = { email: admin.email, sub: admin._id };
    console.log('Payload for JWT:', payload); // Log để kiểm tra payload
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
