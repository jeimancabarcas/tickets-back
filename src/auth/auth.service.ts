import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/models/login.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private readonly userService: UserService) { }

  async validateUser(user: LoginDTO): Promise<any> {
    // 🔑 Aquí deberías buscar el usuario en la BD
    const userFind = await this.userService.findByUsername(user.username);

    const isMatch = await bcrypt.compare(userFind.password, user.password);
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
