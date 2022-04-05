import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { FoodModule } from 'src/food/food.module';

@Module({
  imports: [FoodModule],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
