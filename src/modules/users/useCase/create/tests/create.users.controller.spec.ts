import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { UsersRepository } from '../../../../../modules/users/repositories/users.repository';
import { CreateUsersController } from '../create.users.controller';
import { CreateUsersUseCase } from '../create.users.useCase';
import { CreateUsersDTO } from '../create.users.dto';

describe('Suite Tests Create Users', () => {
  let app: INestApplication;
  let createUseCase: CreateUsersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CreateUsersController],
      providers: [
        CreateUsersUseCase,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    createUseCase = moduleRef.get<CreateUsersUseCase>(CreateUsersUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('POST /users', () => {
    it('POST /users', async () => {
      const createUser: CreateUsersDTO = {
        name: 'name',
        email: 'name@name.com',
        password: '%?luZkP1JN7j',
        confirmPassword: '%?luZkP1JN7j',
      };

      const createUseCaseSpy = jest
        .spyOn(createUseCase, 'execute')
        .mockResolvedValue(<any>createUser);

      const result = await request(app.getHttpServer())
        .post(`/users`)
        .set({})
        .send(createUser)
        .expect(HttpStatus.CREATED);

      expect(result.body).toEqual(createUser);
      expect(createUseCaseSpy).toHaveBeenNthCalledWith(1, createUser);
    });

    it('Bad Request - Not Sent body', async () => {
      const createUseCaseSpy = jest.spyOn(createUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .post(`/users`)
        .set({})
        .send()
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message).toEqual(
        expect.arrayContaining([
          'name must be a string',
          'name should not be empty',
          'email must be a string',
          'email must be an email',
          'email should not be empty',
          'password must be a string',
          'password should not be empty',
          'password too weak',
          'password must be shorter than or equal to 16 characters',
          'password must be longer than or equal to 8 characters',
          'confirmPassword must be a string',
          'confirmPassword should not be empty',
          'confirmPassword must be shorter than or equal to 16 characters',
          'confirmPassword must be longer than or equal to 8 characters',
        ]),
      );
      expect(createUseCaseSpy).not.toBeCalled();
    });
  });
});
