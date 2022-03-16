import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCategories(): Array<string> {
    return [
      '전체',
      '한식',
      '중식',
      '양식',
      '일식',
      '분식',
      '디저트',
      '치킨',
      '피자',
      '패스트푸드',
    ];
  }
}
