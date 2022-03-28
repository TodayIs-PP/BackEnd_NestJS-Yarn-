import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { FoodRepository } from '../food/entity/food.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from '../food/entity/food.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  providers: [QuestionService, FoodRepository],
  controllers: [QuestionController],
})
export class QuestionModule {}
