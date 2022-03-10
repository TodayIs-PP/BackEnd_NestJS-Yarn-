import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './food/food.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [FoodModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
