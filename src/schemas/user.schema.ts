import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Roles } from 'src/models/rol.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({
    type: [String],
    enum: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.CUSTOMER, Roles.OPERATOR],
    default: 'user'
  })
  role: string [] ;
}

export const UserSchemaFactory = SchemaFactory.createForClass(User);
