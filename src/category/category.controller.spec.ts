import { Test, TestingModule } from '@nestjs/testing';
import { ResponseDTO } from 'src/global/response.dto';
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
      console.log(e);
      expect(e).toBeInstanceOf(Error);
    }
  });
  
  it('getCategory: Success', async () => {
    const food1 = new Food('소유라멘', null, '일식', '라멘', '짠맛', null);
    const food2 = new Food('소금라멘', null, '일식', '라멘', '단백한맛', null);

    const response = new ResponseDTO(null, [food1, food2]);

    jest
      .spyOn(service, 'getCategory')
      .mockImplementation(() => Promise.resolve([food1, food2]));

    expect(await controller.getCategory('일식')).toEqual(response);
  }
});
