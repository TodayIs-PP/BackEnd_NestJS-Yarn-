import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ResponseDTO } from '../global/response.dto';
import { AddFood } from './dto/addFood.dto';
import { Food } from './entity/food.entity';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

let controller: FoodController;
let service: FoodService;

async function injectDependency() {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [FoodController],
    providers: [
      {
        provide: FoodService,
        useValue: {
          getFoods: jest.fn(),
          addFood: jest.fn(),
          search: jest.fn(),
        },
      },
    ],
  }).compile();

  controller = module.get<FoodController>(FoodController);
  service = module.get<FoodService>(FoodService);
}

describe('FoodController: addFood', () => {
  beforeEach(async () => {
    await injectDependency();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('addFood: Fail', async () => {
    jest
      .spyOn(service, 'addFood')
      .mockRejectedValue(new Error('Fail to save foods'));

    try {
      await controller.addFood(
        null,
        new AddFood('소유라멘', '일식', '라멘', '짠맛', null),
      );
    } catch (e) {
      expect(e).toBeInstanceOf(InternalServerErrorException);
      expect(e.response).toStrictEqual({
        message: 'Fail to save foods',
        data: null,
      });
    }
  });

  it('addFood: Success', async () => {
    jest
      .spyOn(service, 'addFood')
      .mockResolvedValue(
        new Food('소유라멘', null, '일식', '라멘', '짠맛', null),
      );

    const responseDTO = new ResponseDTO();
    responseDTO.message = 'Food added successfully';

    expect(
      await controller.addFood(
        null,
        new AddFood('소유라멘', '일식', '라멘', '짠맛', null),
      ),
    ).toStrictEqual(responseDTO);
  });
});

describe('FoodController: getFoods', () => {
  beforeEach(async () => {
    await injectDependency();
  });

  it('getFoods: Fail', async () => {
    jest
      .spyOn(service, 'getFoods')
      .mockRejectedValue(new Error('Fail to load Foods'));

    try {
      await controller.getFoods();
    } catch (e) {
      expect(e).toBeInstanceOf(InternalServerErrorException);
      expect(e.response).toStrictEqual({
        message: 'Fail to load Foods',
        data: null,
      });
    }
  });

  it('getFoods: Success', async () => {
    const food1 = new Food('소유라멘', null, '일식', '라멘', '짠맛', null);
    const food2 = new Food('소금라멘', null, '일식', '라멘', '단백한맛', null);

    jest.spyOn(service, 'getFoods').mockResolvedValue([food1, food2]);

    const responseDTO = new ResponseDTO();
    responseDTO.data = [food1, food2];

    expect(await controller.getFoods()).toStrictEqual(responseDTO);
  });
});

describe('FoodController: searchFood', () => {
  beforeEach(async () => {
    await injectDependency();
  });

  it('searchFood: Fail', async () => {
    try {
      await controller.search('치킨');
    } catch (e) {
      expect(e).toBeInstanceOf(InternalServerErrorException);
      expect(e.response).toStrictEqual({
        message: 'Fail to search Foods',
        data: null,
      });
    }
  });

  it('searchFood: Success', async () => {
    const food: Food = new Food('뿌링클', null, '치킨', null, '짠맛', '단맛');

    jest.spyOn(service, 'search').mockResolvedValue([food]);

    const responseDTO = new ResponseDTO();
    responseDTO.data = [food];

    expect(await controller.search('치킨')).toStrictEqual(responseDTO);
  });
});
