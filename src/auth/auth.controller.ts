import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/models/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() user: LoginDTO) {
    const loginUser = await this.authService.validateUser({
      username: user.username,
      password: user.password,
    });
    console.log("User: ",loginUser);
    if (!loginUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    this.logger.log(`Usuario : ${loginUser} `);
    return this.authService.login(loginUser);
  }
}
