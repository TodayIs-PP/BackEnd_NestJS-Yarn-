import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDTO } from './global/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('categories')
  getCategories(): ResponseDTO<string[]> {
    return new ResponseDTO(null, this.appService.getCategories());
  }
}
