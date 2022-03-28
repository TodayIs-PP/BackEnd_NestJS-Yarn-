import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Food } from '../food/entity/food.entity';
import { FoodRepository } from '../food/entity/food.repository';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: FoodRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        FoodRepository,
        {
          provide: getModelToken(Food.name),
          useFactory: () => ({}),
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<FoodRepository>(FoodRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getCategory: Fail(Error)', async () => {
    try {
      await service.getCategory('일식');
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('getCategory: Fail', async () => {
    const food1 = new Food('뿌링클', null, '치킨', null, '짠맛', null);
    const food2 = new Food('황금올리브', null, '치킨', null, '단백한맛', null);

    jest
      .spyOn(repository, 'findByCategoryName')
      .mockImplementation(() => Promise.resolve([food1, food2]));

    expect(await service.getCategory('일식')).not.toBe([food1, food2]);
  });

  it('getCategory: Success', async () => {
    const food1 = new Food('소유라멘', null, '일식', '라멘', '짠맛', null);
    const food2 = new Food('소금라멘', null, '일식', '라멘', '단백한맛', null);

    jest
      .spyOn(repository, 'findByCategoryName')
      .mockImplementation(() => Promise.resolve([food1, food2]));

    expect(await service.getCategory('일식')).toEqual([food1, food2]);
  });
});
