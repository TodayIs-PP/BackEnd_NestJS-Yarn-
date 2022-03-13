import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AddFood } from './dto/addFood.dto';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async addFood(
    @Body() addFood: AddFood,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.foodService.addFood(addFood);
      return res.status(HttpStatus.CREATED).json({ message: 'Food added' });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
