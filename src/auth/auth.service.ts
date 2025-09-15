import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async validateUser(username: string, password: string): Promise<any> {
    // 🔑 Aquí deberías buscar el usuario en la BD
    const user = { id: 1, username: 'test', password: await bcrypt.hash('1234', 10) };

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
