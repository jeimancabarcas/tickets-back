import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo, MongooseError } from 'mongoose';
import { Rol } from 'src/schemas/rol.schema';

@Injectable()
export class RolService {
  

  constructor(@InjectModel(Rol.name) private readonly rolModel: Model<Rol>) { }
    private readonly logger = new Logger(RolService.name);
  async createRol(rolName: string): Promise<Rol> {
    try {
     const newRol = new this.rolModel({ name: rolName });
      return await newRol.save();
    } catch (error:mongo.MongoError | any ){
      this.logger.log('Error creating rol', error.message);
    }
    
  }

  getRoleById(roleId: string) {
    try {
      return this.rolModel.findById(roleId).exec(); 
    } catch (error) {
      this.logger.error('Error finding rol by ID', error.message);
    }
  }

   async findByRolname(name: string): Promise<Rol | null> {
      try {
        return await this.rolModel.findOne({ name }).exec();
      } catch (error: MongooseError | any) {
        this.logger.error('Error finding rol by name', error.message);
        return null;
      }
    }
}
