import { Injectable } from '@nestjs/common';
import { Food } from '../food/entity/food.entity';
import { FoodRepository } from '../food/entity/food.repository';

@Injectable()
export class QuestionService {
  constructor(private readonly foodRepository: FoodRepository) {}

  TASTES: string[] = [
    '짠거',
    '매운거',
    '단거',
    '심심한거',
    '고소한거',
    '단백한거',
    '신거',
  ];

  ADDFOODTASTES: string[] = [
    '짠거',
    '매운거',
    '단거',
    '심심한거',
    '고소한거',
    '단백한거',
    '신거',
    '선택안함',
  ];

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
