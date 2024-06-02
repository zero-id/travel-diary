import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() createAuthDto: SignUpDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('/sign-in')
  signIn(@Body() { email, password }: SignInDto) {
    return this.authService.signIn(email, password); 
  }
}
