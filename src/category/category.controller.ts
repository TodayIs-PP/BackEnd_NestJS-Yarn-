import { Controller, Get, Query } from '@nestjs/common';
import { ResponseDTO } from 'src/global/response.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(@Query('name') categoryName: string): ResponseDTO<string[]> {
    return new ResponseDTO(null, this.categoryService.getCategories());
  }
}
