import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredetialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() credentials: LoginCredetialsDto) {
    return this.authService.login(credentials);
  }
}
