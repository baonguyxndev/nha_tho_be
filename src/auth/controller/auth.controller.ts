import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@/middleware/passport/local.auth.guard';
import { AuthService } from '../service/auth.service';
import { Public, ResponseMessage } from '@/decorator/customize';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { CodeAuthDto } from '../dto/code-auth-dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
  ) { }

  @Post("login")
  @Public()
  @ResponseMessage("Fetch Login")
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

  @Post('checkCode')
  @Public()
  checkCode(@Body() codeAuhtDto: CodeAuthDto) {
    return this.authService.checkCode(codeAuhtDto);
  }

  @Post('retryActive')
  @Public()
  retryActive(@Body("email") email: string) {
    return this.authService.retryActive(email);
  }

  @Get('mail')
  @Public()
  sendEmail() {
    this.mailerService
      .sendMail({
        to: 'baonguyxndev@gmail.com',
        subject: 'Xác thực email ✔',
        template: "register",
        context: {
          name: "Bao Nguyxn",
          activationCode: 356034567
        }
      })
    return "ok"
  }
}
