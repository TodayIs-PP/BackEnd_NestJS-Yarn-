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

  async search(word: string): Promise<Food[]> {
    return await this.foodModel
      .find({ name: { $regex: '.*' + word + '.*' } })
      .exec();
  }

  async findByCategoryName(categoryName: string): Promise<Food[]> {
    if (categoryName == '전체') {
      return await this.foodModel.find().exec();
    } else {
      return await this.foodModel.find({ kind1: categoryName }).exec();
    }
  }

  async findByQuestions(
    detailKind1?: string,
    detailKind2?: string,
    kind1?: string,
    kind2?: string,
    flavor1?: string,
    flavor2?: string,
  ) {
    const query = {};
    if (detailKind1 && detailKind2) {
      query['detailKind'] = { $nin: [detailKind1, detailKind2] };
    } else if (detailKind1) {
      query['detailKind'] = { $ne: detailKind1 };
    } else if (detailKind2) {
      query['detailKind'] = { $ne: detailKind2 };
    }
    if (kind1) {
      query['kind1'] = kind1;
    }
    if (kind2) {
      query['kind2'] = kind2;
    }
    if (flavor1) {
      query['flavor1'] = flavor1;
    }
    if (flavor2) {
      query['flavor2'] = flavor2;
    }
    return await this.foodModel.find(query).exec();
  }
}
