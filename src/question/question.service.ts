import { Injectable } from '@nestjs/common';
import { Food } from '../food/entity/food.entity';
import { FoodRepository } from '../food/entity/food.repository';

@Injectable()
export class QuestionService {
  constructor(private readonly foodRepository: FoodRepository) {}

  async getQuestionsResult(
    detailKind1?: string,
    detailKind2?: string,
    kind1?: string,
    kind2?: string,
    flavor1?: string,
    flavor2?: string,
  ): Promise<Food[]> {
    try {
      return this.foodRepository.findByQuestions(
        detailKind1,
        detailKind2,
        kind1,
        kind2,
        flavor1,
        flavor2,
      );
    } catch (e) {
      throw new Error('Fail to load foods');
    }
  }
}
