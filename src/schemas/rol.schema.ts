import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RolDocument = HydratedDocument<Rol>;

@Schema()
export class Rol {
  @Prop({ required: true, unique: true })
  name: string;
}

export const RoleSchemaFactory = SchemaFactory.createForClass(Rol);