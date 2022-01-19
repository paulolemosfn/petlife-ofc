import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { UsersRepository } from '../../../../../modules/users/repositories/users.repository';
import { GetUsersByIdController } from '../getById.users.controller';
import { GetUsersByIdUseCase } from '../getById.users.useCase';

describe('Get users by id Controller Tests', () => {
  let app: INestApplication;
  let getByIdUseCase: GetUsersByIdUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GetUsersByIdController],
      providers: [
        GetUsersByIdUseCase,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    getByIdUseCase = moduleRef.get<GetUsersByIdUseCase>(GetUsersByIdUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  const user_id = uuid();

  const defaultHeaders = {
    username: 'teste',
    useremail: 'test@test.com',
    user_id,
  };

  describe('GET /users/:id', () => {
    it('should return users by id', async () => {
      const id = uuid();

      const expectedRes = { id } as any;

      const getByIdUseCaseSpy = jest
        .spyOn(getByIdUseCase, 'execute')
        .mockResolvedValue(expectedRes);

      const result = await request(app.getHttpServer())
        .get(`/users/${id}`)
        .set(defaultHeaders)
        .send()
        .expect(HttpStatus.OK);

      expect(result.body).toEqual(expectedRes);
      expect(getByIdUseCaseSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
    });

    it('Bad Request - Invalid params', async () => {
      const getByIdUseCaseSpy = jest.spyOn(getByIdUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .get(`/users/invalid-id`)
        .set({})
        .send()
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message).toEqual(
        expect.arrayContaining(['id must be a UUID']),
      );
      expect(getByIdUseCaseSpy).not.toBeCalled();
    });
  });
});
