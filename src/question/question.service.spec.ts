import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Food } from '../food/entity/food.entity';
import { FoodRepository } from '../food/entity/food.repository';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;
  let repository: FoodRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        FoodRepository,
        {
          provide: getModelToken(Food.name),
          useFactory: () => ({}),
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    repository = module.get<FoodRepository>(FoodRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('GetQuestionsResult: Fail', async () => {
    jest
      .spyOn(repository, 'findByQuestions')
      .mockRejectedValue(new Error('Fail to load foods'));

    try {
      await service.getQuestionsResult();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Fail to load foods');
    }
  });

  it('GetQuestionsResult: Success', async () => {
    jest.spyOn(repository, 'findByQuestions').mockResolvedValue([]);

    expect(await service.getQuestionsResult()).toBeInstanceOf(Array);
  });
});
