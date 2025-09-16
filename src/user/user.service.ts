import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { UserDTO } from 'src/models/user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(userData: UserDTO): Promise<User> {
    try {
      const newUser = {
        username: userData.username,
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 10),
      };
      const createdUser = new this.userModel(newUser);
      return await createdUser.save();
    } catch (error: MongooseError | any) {
      this.logger.error('Error creating user', error.message);
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ username }).exec();
    } catch (error: MongooseError | any) {
      this.logger.error('Error finding user by username', error.message);
      return null;
    }
  }
}
