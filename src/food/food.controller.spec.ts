import { Test, TestingModule } from '@nestjs/testing';
import { AddFood } from './dto/addFood.dto';
import { Food } from './entity/food.entity';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

describe('FoodController', () => {
  let controller: FoodController;
  let service: FoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [
        {
          provide: FoodService,
          useValue: {
            getFoods: jest.fn(),
            addFood: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FoodController>(FoodController);
    service = module.get<FoodService>(FoodService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('addFood: Fail', async () => {
    jest
      .spyOn(service, 'addFood')
      .mockRejectedValue(new Error('Fail to add food'));

    try {
      await controller.addFood(
        new AddFood('소유라멘', null, '일식', '라멘', '짠맛', null),
      );
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Fail to add food');
    }
  });

  it('addFood: Success', async () => {
    jest
      .spyOn(service, 'addFood')
      .mockResolvedValue(
        new Food('소유라멘', null, '일식', '라멘', '짠맛', null),
      );

    expect(
      await controller.addFood(
        new AddFood('소유라멘', null, '일식', '라멘', '짠맛', null),
      ),
    ).toBeInstanceOf(Food);
  });
});
