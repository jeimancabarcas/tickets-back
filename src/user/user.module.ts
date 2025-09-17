import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchemaFactory } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RolService } from 'src/rol/rol.service';
import { RolModule } from 'src/rol/rol.module';
import { Rol } from 'src/schemas/rol.schema';

@Module({
  imports: [
    RolModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchemaFactory },
      { name: Rol.name, schema: UserSchemaFactory },

    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RolService],
  exports: [UserService],
})
export class UserModule {}
