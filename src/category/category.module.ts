import { Module } from '@nestjs/common';
import { FoodRepository } from '../food/entity/food.repository';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, FoodRepository],
})
export class CategoryModule {}
