import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AddFood } from './dto/addFood.dto';
import { Food } from './entity/food.entity';
import { FoodRepository } from './entity/food.repository';
import { FoodService } from './food.service';

describe('FoodsService', () => {
  type NewType = FoodService;

  let service: NewType;
  let repository: FoodRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        FoodRepository,
        {
          provide: getModelToken(Food.name),
          useFactory: () => ({}),
        },
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
    repository = module.get<FoodRepository>(FoodRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of foods', async () => {
    try {
      await service.getFoods();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Fail to load foods');
    }
  });

  it('should return an array of foods', async () => {
    jest
      .spyOn(repository, 'findAll')
      .mockImplementation(() => Promise.resolve([]));

    expect(await service.getFoods()).toBeInstanceOf(Array);
  });
});

describe('FoodsService: addFood', () => {
  let service: FoodService;
  let repository: FoodRepository;
  let food: Food;
  let addFood: AddFood;

  beforeAll(() => {
    food = new Food();
    food.name = '자장면';
    food.image = '이미지';
    food.kind1 = '중식';
    food.kind2 = '면';
    food.flavor1 = '짠맛';

    addFood = new AddFood('자장면', '이미지', '중식', '면', '짠맛');
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        FoodRepository,
        {
          provide: getModelToken(Food.name),
          useFactory: () => ({}),
        },
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
    repository = module.get<FoodRepository>(FoodRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Add food: return error', async () => {
    try {
      await service.addFood(addFood);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Fail to save foods');
    }
  });

  it('Add food: return food', async () => {
    jest
      .spyOn(repository, 'create')
      .mockImplementation(() => Promise.resolve(food));

    expect(await service.addFood(addFood)).toBeInstanceOf(Food);
  });
});
