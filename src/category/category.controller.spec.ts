import { Test, TestingModule } from '@nestjs/testing';
import { ResponseDTO } from '../global/response.dto';
import { Food } from '../food/entity/food.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            CATEGORIES: [
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
            ],
            ADDFOODCATEGORIES: [
              '한식',
              '중식',
              '양식',
              '일식',
              '분식',
              '디저트',
              '치킨',
              '피자',
              '패스트푸드',
              '선택안함',
            ],
            getCategory: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getCategory: Fail', async () => {
    try {
      await controller.getCategory('일식');
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('getCategory: Success(특정 카테고리)', async () => {
    const food1 = new Food('소유라멘', null, '일식', '라멘', '짠맛', null);
    const food2 = new Food('소금라멘', null, '일식', '라멘', '단백한맛', null);

    const response = new ResponseDTO(null, [food1, food2]);

    jest
      .spyOn(service, 'getCategory')
      .mockImplementation(() => Promise.resolve([food1, food2]));

    expect(await controller.getCategory('일식')).toEqual(response);
  });

  it('getCategory: Success(전체)', async () => {
    const food1 = new Food('소유라멘', null, '일식', '라멘', '짠맛', null);
    const food2 = new Food('뿌링클', null, '치킨', null, '짠맛', '단맛');

    const response = new ResponseDTO(null, [food1, food2]);

    jest
      .spyOn(service, 'getCategory')
      .mockImplementation(() => Promise.resolve([food1, food2]));

    expect(await controller.getCategory('전체')).toEqual(response);
  });

  it('getCategories: Success', async () => {
    const response = new ResponseDTO(null, [
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
    ]);
    expect(await controller.getCategories()).toStrictEqual(response);
  });

  it('getAddFoodCategories: Success', async () => {
    const response = new ResponseDTO(null, [
      '한식',
      '중식',
      '양식',
      '일식',
      '분식',
      '디저트',
      '치킨',
      '피자',
      '패스트푸드',
      '선택안함',
    ]);
    expect(await controller.getAddFoodCategories()).toStrictEqual(response);
  });
});
