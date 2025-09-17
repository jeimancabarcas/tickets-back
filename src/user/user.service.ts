import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { UserDTO } from 'src/models/user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RolService } from 'src/rol/rol.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,private readonly rolService: RolService
  ) {}

  async createUser(userData: UserDTO): Promise<User> {
    try {
      const newUser = {
        username: userData.username,
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 10),
        role:userData.role,
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

  async updateuser(id: string, userData: Partial<UserDTO>): Promise<User | null> {
    try {
      if (userData.password) {
        userData.password = bcrypt.hashSync(userData.password, 10);
      }
      return await this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
    } catch (error: MongooseError | any) {
      this.logger.error('Error updating user', error.message);
      return null;
    }
  }

  async deleteUser(id: string): Promise<User | null> {
    try {
      return await this.userModel.findByIdAndDelete(id).exec();
    } catch (error: MongooseError | any) {
      this.logger.error('Error deleting user', error.message);
      return null;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error: MongooseError | any) {
      this.logger.error('Error retrieving all users', error.message);
      return [];
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error: MongooseError | any) {
      this.logger.error('Error retrieving user by ID', error.message);
      return null;
    }
  }

  async assignRoleToUser(userId: string, roleId: string): Promise<User | null> {
    try {
      const role = await this.rolService.getRoleById(roleId);
      if (!role) {
        this.logger.warn(`Role with ID ${roleId} not found`);
        return null;
      }
      return await this.userModel.findByIdAndUpdate(
        userId,
        { role: role._id },
        { new: true }
      ).exec();
    } catch (error: MongooseError | any) {
      this.logger.error('Error assigning role to user', error.message);
      return null;
    }
  }
}
