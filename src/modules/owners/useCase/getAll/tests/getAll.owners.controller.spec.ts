import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
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
    const user_id = uuid();

    it('should return the all owners', async () => {
      const defaultHeaders = {
        username: 'Test',
        useremail: 'test@test.com',
        user_id,
      };

      const queryParams = {} as any;

      const getAllUseCaseSpy = jest
        .spyOn(getAllUseCase, 'execute')
        .mockResolvedValue(queryParams);

      const result = await request(app.getHttpServer())
        .get(`/owners`)
        .query(queryParams)
        .set(defaultHeaders)
        .expect(HttpStatus.OK);

      expect(result.body).toEqual(queryParams);
      expect(getAllUseCaseSpy).toHaveBeenNthCalledWith(
        1,
        queryParams,
        defaultHeaders,
        false,
      );
    });
  });
});
