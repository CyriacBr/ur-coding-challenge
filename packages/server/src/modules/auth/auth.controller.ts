import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from 'common';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signUp')
  register(@Body() dto: AuthDTO.SignUp) {
    return this.service.signUp(dto);
  }

  @Post('signIn')
  loginWithEmail(@Body() dto: AuthDTO.SignIn) {
    return this.service.signIn(dto);
  }

  @Post('me')
  me(@Body() dto: AuthDTO.Me) {
    return this.service.me(dto);
  }
}
