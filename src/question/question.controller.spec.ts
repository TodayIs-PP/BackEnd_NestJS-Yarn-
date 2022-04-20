import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { ResponseDTO } from '../global/response.dto';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

describe('QuestionController', () => {
  let controller: QuestionController;
  let service: QuestionService;
  const responseMock = {
    statusCode: Number,

    status: jest.fn((httpStatusCode: number) => {
      responseMock.statusCode = httpStatusCode;
      return responseMock;
    }),
    json: jest.fn((body) => {
      responseMock.send = body;
      return responseMock;
    }),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: {
            TASTES: [
              '짠거',
              '매운거',
              '단거',
              '심심한거',
              '고소한거',
              '단백한거',
              '신거',
            ],
            ADDFOODTASTES: [
              '짠거',
              '매운거',
              '단거',
              '심심한거',
              '고소한거',
              '단백한거',
              '신거',
              '선택안함',
            ],
            getQuestionsResult: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GetQuestionsResult: Fail', async () => {
    const responseDTO = new ResponseDTO();
    responseDTO.message = 'Fail to load questions';

    expect(
      await controller.getQuestionsResult(
        '라면',
        '치킨',
        '양식',
        'nil',
        '고소한맛',
        'nil',
        responseMock,
      ),
    ).toBe(responseMock.status(HttpStatus.BAD_REQUEST).json(responseDTO));
  });

  it('GetQuestionsResult: Success', async () => {
    jest.spyOn(service, 'getQuestionsResult').mockResolvedValue([]);

    const responseDTO = new ResponseDTO();
    responseDTO.data = [];

    expect(
      await controller.getQuestionsResult(
        '라면',
        '치킨',
        '양식',
        'nil',
        '고소한맛',
        'nil',
        responseMock,
      ),
    ).toBe(responseMock.status(HttpStatus.OK).json(responseDTO));
  });

  it('getTastes: Success', () => {
    expect(controller.getTastes(responseMock)).toBe(
      responseMock
        .status(HttpStatus.OK)
        .json(new ResponseDTO(null, service.TASTES)),
    );
  });

  it('getAddFoodCategories: Success', async () => {
    const response = new ResponseDTO(null, [
      '짠거',
      '매운거',
      '단거',
      '심심한거',
      '고소한거',
      '단백한거',
      '신거',
      '선택안함',
    ]);
    expect(await controller.getAddFoodTastes()).toStrictEqual(response);
  });
});
