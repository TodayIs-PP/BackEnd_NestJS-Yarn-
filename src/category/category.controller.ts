import { Controller, Get, Query } from '@nestjs/common';
import { Food } from '../food/entity/food.entity';
import { ResponseDTO } from '../global/response.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategory(
    @Query('name') categoryName: string,
  ): Promise<ResponseDTO<Food[]>> {
    return new ResponseDTO(
      null,
      await this.categoryService.getCategory(categoryName),
    );
  }
}
