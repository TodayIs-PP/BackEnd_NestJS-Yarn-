import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Food } from './food.entity';
import { FoodRepository } from './food.repository';

describe('FoodRepository', () => {
  type NewType = FoodRepository;

  let repository: NewType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodRepository,
        {
          provide: getModelToken(Food.name),
          useFactory: () => ({}),
        },
      ],
    }).compile();

    repository = module.get<FoodRepository>(FoodRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('search with word: Fail', async () => {
    jest
      .spyOn(repository, 'search')
      .mockRejectedValue(new Error('Fail to search'));

    try {
      await repository.search('라멘');
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Fail to search');
    }
  });

  it('search with word: Success', async () => {
    const food1 = new Food('소유라멘', null, '일식', '라멘', '짠맛', null);
    const food2 = new Food('소금라멘', null, '일식', '라멘', '단백한맛', null);

    jest.spyOn(repository, 'search').mockResolvedValue([food1, food2]);

    expect(await repository.search('라멘')).toBeInstanceOf(Array);
  });
});
