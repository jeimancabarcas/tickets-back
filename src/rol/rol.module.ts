import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RoleSchemaFactory } from 'src/schemas/rol.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rol.name, schema: RoleSchemaFactory }]),
  ],
  controllers: [RolController],
  providers: [RolService],
})
export class RolModule {}
