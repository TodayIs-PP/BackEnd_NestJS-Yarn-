import { Module } from '@nestjs/common';
import { FoodRepository } from '../food/entity/food.repository';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from '../food/entity/food.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, FoodRepository],
})
export class CategoryModule {}
