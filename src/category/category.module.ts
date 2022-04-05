import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { FoodModule } from 'src/food/food.module';

@Module({
  imports: [FoodModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
