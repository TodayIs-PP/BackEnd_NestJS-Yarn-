import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseDTO } from '../global/response.dto';
import { multerDiskOptions } from '../global/multer.options';
import { AddFood } from './dto/addFood.dto';
import { Food } from './entity/food.entity';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerDiskOptions))
  async addFood(
    @UploadedFile() image: Express.Multer.File,
    @Body() addFood: AddFood,
  ): Promise<ResponseDTO<any>> {
    try {
      await this.foodService.addFood(image, addFood);
      return new ResponseDTO<Food[]>('Food added successfully');
    } catch (e) {
      throw new InternalServerErrorException({
        message: e.message,
        data: null,
      });
    }
  }

  @Get('/foods')
  async getFoods(): Promise<ResponseDTO<Food[]>> {
    try {
      const foods = await this.foodService.getFoods();
      return new ResponseDTO<Food[]>(null, foods);
    } catch (e) {
      throw new InternalServerErrorException({
        message: e.message,
        data: null,
      });
    }
  }

  @Get('/search')
  async search(
    @Query('searchFood') searchFood: string,
  ): Promise<ResponseDTO<Food[]>> {
    const foods = await this.foodService.search(searchFood);

    try {
      return new ResponseDTO<Food[]>(null, foods);
    } catch (e) {
      throw new InternalServerErrorException({
        message: e.message,
        data: null,
      });
    }
  }
}
