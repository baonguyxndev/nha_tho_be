import { comparePasswordHelper } from '@/helpers/util';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UsersService } from '@/modules/users/service/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const isValidPassword = await comparePasswordHelper(password, user.password);
    if (!user || !isValidPassword)
      return null;
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    console.log('Payload for JWT:', payload); // Log để kiểm tra payload
    return {
      user: {
        email: user.email,
        _id: user._id,
        name: user.name
      },
      access_token: this.jwtService.sign(payload),
    }
  }

  handleRegister = async (registerDto: CreateAuthDto) => {
    return await this.userService.handleRegister(registerDto)
  }
}
