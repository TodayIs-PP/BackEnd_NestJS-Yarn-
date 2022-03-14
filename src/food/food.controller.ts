import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ResponseDTO } from '../global/response.dto';
import { multerDiskOptions } from '../global/multer.options';
import { AddFood } from './dto/addFood.dto';
import { Food } from './entity/food.entity';
import { FoodService } from './food.service';

type JsonResponse = Response<any, Record<string, any>>;

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerDiskOptions))
  async addFood(
    @UploadedFile() image: Express.Multer.File,
    @Body() addFood: AddFood,
    @Res() res: Response,
  ): Promise<JsonResponse> {
    try {
      await this.foodService.addFood(image, addFood);
      return res.status(HttpStatus.CREATED).json({ message: 'Food added' });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  @Get('/foods')
  async getFoods(@Res() res: Response): Promise<JsonResponse> {
    try {
      const foods = await this.foodService.getFoods();
      return res
        .status(HttpStatus.OK)
        .json(new ResponseDTO<Food[]>(null, foods));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ResponseDTO(e.message));
    }
  }
}
