import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/models/login.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name );
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  async validateUser(user: LoginDTO): Promise<any> {
    const userFind = await this.userService.findByUsername(user.username);
    const isMatch = await bcrypt.compare(user.password, userFind?.password);
    console.log(isMatch);
    if (userFind && isMatch) {
      const { password, ...result } = user;
      console.log("Result: ",result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES'),
    });
    return { token: access_token, refresh: refreshToken };
  }

  async refresh(refresToken: string) {
    try {
      const payload = this.jwtService.verify(refresToken, {
        secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
      });
      const newAccessToken = this.jwtService.sign(
        { username: payload.username, sub: payload.sub },
        {
          secret: this.configService.getOrThrow<string>('JWT_SECRET'),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_ACCESS_EXPIRES',
          ),
        },
      );
      return { token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh token is invalid or expired', error);
    }
  }
}
