import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { UsersRepository } from '../../../../../modules/users/repositories/users.repository';
import { GetAllUsersController } from '../getAll.users.controller';
import { GetAllUsersUseCase } from '../getAll.users.useCase';

describe('Get users by id Controller Tests', () => {
  let app: INestApplication;
  let getAllUseCase: GetAllUsersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GetAllUsersController],
      providers: [
        GetAllUsersUseCase,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    getAllUseCase = moduleRef.get<GetAllUsersUseCase>(GetAllUsersUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('GET /users', () => {
    it('should return the all users', async () => {
      const queryParams = {} as any;

      const getAllUseCaseSpy = jest
        .spyOn(getAllUseCase, 'execute')
        .mockResolvedValue(queryParams);

      const result = await request(app.getHttpServer())
        .get(`/users`)
        .set({})
        .expect(HttpStatus.OK);

      expect(result.body).toEqual(queryParams);
      expect(getAllUseCaseSpy).toHaveBeenNthCalledWith(1, queryParams);
    });
  });
});
