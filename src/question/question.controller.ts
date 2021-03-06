import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDTO } from '../global/response.dto';
import { Food } from '../food/entity/food.entity';
import { QuestionService } from './question.service';

type JsonResponse = Response<any, Record<string, any>>;

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/result')
  async getQuestionsResult(
    @Query('detailKind1') detailKind1: string,
    @Query('detailKind2') detailKind2: string,
    @Query('kind1') kind1: string,
    @Query('kind2') kind2: string,
    @Query('flavor1') flavor1: string,
    @Query('flavor2') flavor2: string,
    @Res() res: Response,
  ): Promise<JsonResponse> {
    try {
      return res
        .status(HttpStatus.OK)
        .json(
          new ResponseDTO<Food[]>(
            null,
            await this.questionService.getQuestionsResult(
              detailKind1,
              detailKind2,
              kind1,
              kind2,
              flavor1,
              flavor2,
            ),
          ),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ResponseDTO(e.message));
    }
  }

  @Get('/tastes')
  getTastes(@Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(new ResponseDTO(null, this.questionService.TASTES));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ResponseDTO(null, this.questionService.TASTES));
    }
  }

  @Get('addFoodTastes')
  async getAddFoodTastes(): Promise<ResponseDTO<string[]>> {
    return new ResponseDTO(null, this.questionService.ADDFOODTASTES);
  }
}
