import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/models/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() userData: UserDTO) {
    return await this.userService.createUser(userData);
  }

  @Post('/update')
 async updateUser(@Body() body: { id: string; userData: Partial<UserDTO> } ) {
    const { id, userData } = body;
    return await this.userService.updateuser(id, userData);
  }

  @Post('/delete')
  async deleteUser(@Body() body: { id: string }) {
    const { id } = body;
    return await this.userService.deleteUser(id);
  }
}
