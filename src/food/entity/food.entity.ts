import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AddFood } from '../dto/addFood.dto';

export type FoodDocument = Food & Document;

@Schema()
export class Food {
  constructor(addFood?: AddFood) {
    if (typeof addFood !== 'undefined') {
      this.name = addFood.name;
      this.image = addFood.image;
      this.kind1 = addFood.kind1;
      this.kind2 = addFood.kind2;
      this.flavor1 = addFood.flavor1;
      this.flavor2 = addFood.flavor2;
    }
    this.name = null;
    this.image = null;
    this.kind1 = null;
    this.kind2 = null;
    this.flavor1 = null;
    this.flavor2 = null;
  }
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
