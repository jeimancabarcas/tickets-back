import { Body, Controller, Post } from '@nestjs/common';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post('/create')
  async createRol(@Body('name') name: string) {
    return this.rolService.createRol(name.toUpperCase());
  }
}
