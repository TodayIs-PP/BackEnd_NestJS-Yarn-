import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from './food.entity';

@Injectable()
export class FoodRepository {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async findAll(): Promise<Food[]> {
    return await this.foodModel.find().exec();
  }

  async findOne(id: string): Promise<Food> {
    return await this.foodModel.findById(id).exec();
  }

  async create(food: Food): Promise<Food> {
    return await this.foodModel.create(food);
  }

  async update(id: string, food: Food): Promise<Food> {
    return await this.foodModel
      .findByIdAndUpdate(id, food, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Food> {
    return await this.foodModel.findByIdAndDelete(id).exec();
  }
}
