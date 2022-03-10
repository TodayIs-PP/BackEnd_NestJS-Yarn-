import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema()
export class Food {
  id: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  kind1: string;

  @Prop()
  kind2: string;

  @Prop({ required: true })
  flavor1: string;

  @Prop()
  flavor2: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
