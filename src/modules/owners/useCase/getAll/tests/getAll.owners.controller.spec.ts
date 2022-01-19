import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { OwnersRepository } from '../../../../../modules/owners/repositories/owners.repository';
import { GetAllOwnersController } from '../getAll.owners.controller';
import { GetAllOwnersUseCase } from '../getAll.owners.useCase';

describe('Get owners by id Controller Tests', () => {
  let app: INestApplication;
  let getAllUseCase: GetAllOwnersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GetAllOwnersController],
      providers: [
        GetAllOwnersUseCase,
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    getAllUseCase = moduleRef.get<GetAllOwnersUseCase>(GetAllOwnersUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('GET /owners', () => {
    it('should return the all owners', async () => {
      const queryParams = {} as any;

      const getAllUseCaseSpy = jest
        .spyOn(getAllUseCase, 'execute')
        .mockResolvedValue(queryParams);

      const result = await request(app.getHttpServer())
        .get(`/owners`)
        .set({})
        .expect(HttpStatus.OK);

      expect(result.body).toEqual(queryParams);
      expect(getAllUseCaseSpy).toHaveBeenNthCalledWith(1, queryParams);
    });
  });
});
