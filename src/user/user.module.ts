import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchemaFactory } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { use } from 'passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchemaFactory }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
