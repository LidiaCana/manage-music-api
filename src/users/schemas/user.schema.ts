import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  spotify_id: string;

  @Prop()
  albums: [{ title: string; artist: string; id: string }];
}

export const UserSchema = SchemaFactory.createForClass(User);
