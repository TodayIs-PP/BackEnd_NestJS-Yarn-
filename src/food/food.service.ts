import { Injectable } from '@nestjs/common';
import { FoodRepository } from './entity/food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  getFoods(): Promise<any> {
    return this.foodRepository.findAll();
  }
}
