import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@/auth/service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });// mặc định là username nên đổi thành email
    }

    async validate(email: string, password: string): Promise<any> {
        const employee = await this.authService.validateUser(email, password);
        if (!employee) {
            throw new UnauthorizedException("Email/Password không hợp lệ.");
        }
        return employee;
    }
}