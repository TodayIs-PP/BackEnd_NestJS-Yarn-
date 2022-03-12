import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema()
export class Food {
  constructor(
    name?: string,
    image?: string,
    kind1?: string,
    kind2?: string,
    flavor1?: string,
    flavor2?: string,
  ) {
    this.name = name;
    this.image = image ?? null;
    this.kind1 = kind1;
    this.kind2 = kind2;
    this.flavor1 = flavor1;
    this.flavor2 = flavor2 ?? null;
  }
  id: string;

  @Prop()
  name: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: true })
  kind1: string;

  @Prop({ required: true })
  kind2: string;

  @Prop({ required: true })
  flavor1: string;

  @Prop()
  flavor2: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
