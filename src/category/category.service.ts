import { Injectable } from '@nestjs/common';
import { Food } from '../food/entity/food.entity';
import { FoodRepository } from '../food/entity/food.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly foodRepository: FoodRepository) {}

  getCategories(): Array<string> {
    return [
      '전체',
      '한식',
      '중식',
      '양식',
      '일식',
      '분식',
      '디저트',
      '치킨',
      '피자',
      '패스트푸드',
    ];
  }

  async getCategory(categoryName: string): Promise<Food[]> {
    return this.foodRepository.findByCategoryName(categoryName);
  }
}
