import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { UsersRepository } from '../../../repositories/users.repository';
import { GetUsersByIdUseCase } from '../../getById/getById.users.useCase';
import { InactivateUsersController } from '../inactivate.users.controller';
import { InactivateUsersUseCase } from '../inactivate.users.useCase';

describe('Suites Tests Inactivate User Controller', () => {
  let app: INestApplication;
  let inactivateUseCase: InactivateUsersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [InactivateUsersController],
      providers: [
        InactivateUsersUseCase,
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

    inactivateUseCase = moduleRef.get<InactivateUsersUseCase>(
      InactivateUsersUseCase,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('POST /users/inactivation/{id}', () => {
    const id = uuid();
    const user_id = uuid();

    const defaultHeaders: DefaultHeadersInterface = {
      user_id,
      username: 'Activate Test',
      useremail: 'activate@test.com',
    };

    it('Should be able inactivate a user', async () => {
      const inactivateUseCaseSpy = jest
        .spyOn(inactivateUseCase, 'execute')
        .mockResolvedValue(<any>'User inactivate');

      const result = await request(app.getHttpServer())
        .post(`/users/inactivation/${id}`)
        .set(defaultHeaders)
        .expect(HttpStatus.NO_CONTENT);

      expect(result.body).toEqual({});
      expect(inactivateUseCaseSpy).toHaveBeenNthCalledWith(
        1,
        id,
        defaultHeaders,
      );
    });

    it('Bad Request - Invalid Id', async () => {
      const inactivateUseCaseSpy = jest.spyOn(inactivateUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .post(`/users/inactivation/invalid-id`)
        .set({
          defaultHeaders,
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message[0]).toBe('id must be a UUID');
      expect(inactivateUseCaseSpy).not.toBeCalled();
    });
  });
});
