import { Injectable } from '@nestjs/common';
import { AddFood } from './dto/addFood.dto';
import { Food } from './entity/food.entity';
import { FoodRepository } from './entity/food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  async getFoods(): Promise<any> {
    try {
      return await this.foodRepository.findAll();
    } catch (e) {
      throw Error('Fail to load foods');
    }
  }

  async addFood(addFood: AddFood): Promise<Food> {
    const food = new Food(
      addFood.name,
      addFood.image,
      addFood.kind1,
      addFood.kind2,
      addFood.flavor1,
      addFood.flavor2,
    );
    try {
      return await this.foodRepository.create(food);
    } catch (e) {
      throw Error('Fail to save foods');
    }
  }
}
