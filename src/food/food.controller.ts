import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { multerDiskOptions } from '../global/multer.options';
import { AddFood } from './dto/addFood.dto';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerDiskOptions))
  async addFood(
    @UploadedFile() image: Express.Multer.File,
    @Body() addFood: AddFood,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.foodService.addFood(image, addFood);
      return res.status(HttpStatus.CREATED).json({ message: 'Food added' });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
