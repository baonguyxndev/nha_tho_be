import { comparePasswordHelper } from '@/helpers/util';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UsersService } from '@/modules/users/service/users.service';
import { CodeAuthDto } from '../dto/code-auth-dto';
import { ChangePasswordAuthDto } from '../dto/change-password-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user)
      return null;
    const isValidPassword = await comparePasswordHelper(password, user.password);
    if (!isValidPassword)
      return null;
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      user: {
        email: user.email,
        _id: user._id,
        name: user.name
      },
      accessToken: this.jwtService.sign(payload),
    }
  }

  handleRegister = async (registerDto: CreateAuthDto) => {
    return await this.userService.handleRegister(registerDto)
  }

  checkCode = async (data: CodeAuthDto) => {
    return await this.userService.handleActive(data)
  }

  retryActive = async (data: string) => {
    return await this.userService.retryActive(data)
  }

  changePassword = async (data: ChangePasswordAuthDto) => {
    return await this.userService.changePassword(data)
  }

  forgotPassword = async (data: string) => {
    return await this.userService.forgotPassword(data)
  }
}
