import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { UsersRepository } from '../../../repositories/users.repository';
import { GetUsersByIdUseCase } from '../../getById/getById.users.useCase';
import { ActivateUsersController } from '../activate.users.controller';
import { ActivateUsersUseCase } from '../activate.users.useCase';

describe('Suites Tests Activate Users Controller', () => {
  let app: INestApplication;
  let activeUseCase: ActivateUsersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ActivateUsersController],
      providers: [
        ActivateUsersUseCase,
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

    activeUseCase = moduleRef.get<ActivateUsersUseCase>(ActivateUsersUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('POST /users/activation/{id}', () => {
    const id = uuid();
    const user_id = uuid();

    const defaultHeaders: DefaultHeadersInterface = {
      user_id,
      username: 'Activate Test',
      useremail: 'activate@test.com',
    };

    it('Should activate a Users', async () => {
      const activateUseCaseSpy = jest
        .spyOn(activeUseCase, 'execute')
        .mockResolvedValue(<any>'User activate');

      const result = await request(app.getHttpServer())
        .post(`/users/activation/${id}`)
        .set(defaultHeaders)
        .expect(HttpStatus.NO_CONTENT);

      expect(result.body).toEqual({});
      expect(activateUseCaseSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
    });

    it('Bad Request - Invalid Id', async () => {
      const activateUseCaseSpy = jest.spyOn(activeUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .post(`/users/activation/invalid-id`)
        .set({
          defaultHeaders,
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message[0]).toBe('id must be a UUID');
      expect(activateUseCaseSpy).not.toBeCalled();
    });
  });
});
