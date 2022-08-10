import { UsersRepository } from './../../../../users/repositories/users.repository';
import { OwnersRepository } from './../../../repositories/owners.repository';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { CreateOwnersController } from '../create.owners.controller';
import { CreateOwnersUseCase } from '../create.owners.useCase';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';
import { GetUsersByIdUseCase } from '../../../../../modules/users/useCase/getById/getById.users.useCase';
import { CreateOwnersDTO } from '../create.owners.dto';

describe('Create Owner Controller Tests', () => {
  let app: INestApplication;
  let createUseCase: CreateOwnersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CreateOwnersController],
      providers: [
        CreateOwnersUseCase,
        UsersRepository,
        GetUsersByIdUseCase,
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    createUseCase = moduleRef.get<CreateOwnersUseCase>(CreateOwnersUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('POST /owners', () => {
    it('Should create a owner', async () => {
      const user_id = uuid();

      const defaultHeaders: DefaultHeadersInterface = {
        user_id,
        username: 'Create Test',
        useremail: 'create@test.com',
      };

      const buildowners: CreateOwnersDTO = {
        owner_name: 'Name',
      };

      const expectedRes = { ...buildowners, defaultHeaders } as any;

      const createUseCaseSpy = jest
        .spyOn(createUseCase, 'execute')
        .mockResolvedValue(expectedRes);

      const result = await request(app.getHttpServer())
        .post(`/owners`)
        .set(defaultHeaders)
        .send(buildowners)
        .expect(HttpStatus.CREATED);

      expect(result.body).toEqual(expectedRes);
      expect(createUseCaseSpy).toHaveBeenNthCalledWith(
        1,
        buildowners,
        defaultHeaders,
      );
    });

    it('Bad Request - Invalid params', async () => {
      const createUseCaseSpy = jest.spyOn(createUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .post(`/owners`)
        .set({})
        .send()
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message).toEqual(
        expect.arrayContaining([
          'owner_name must be a string',
          'owner_name should not be empty',
        ]),
      );
      expect(createUseCaseSpy).not.toBeCalled();
    });
  });
});
