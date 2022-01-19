import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersRepository } from '../../../../../modules/users/repositories/users.repository';
import { GetUsersByIdUseCase } from '../../getById/getById.users.useCase';
import { UpdateUsersController } from '../update.users.controller';
import { UpdateUsersUseCase } from '../update.users.useCase';
import { UpdateUsersDTO } from '../update.users.dto';

describe('Update Users Controller', () => {
  let app: INestApplication;
  let updateUseCase: UpdateUsersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UpdateUsersController],
      providers: [
        UpdateUsersUseCase,
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

    updateUseCase = moduleRef.get<UpdateUsersUseCase>(UpdateUsersUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  describe('PUT /users/:id', () => {
    it('should be able update a user', async () => {
      const id = uuid();

      const updateData: UpdateUsersDTO = {
        name: 'Update Test',
        email: 'updatetest@email.com',
        password: ')9#XSqVR',
      };

      const updateUseCaseSpy = jest
        .spyOn(updateUseCase, 'execute')
        .mockResolvedValue(<any>{ id });

      const result = await request(app.getHttpServer())
        .put(`/users/${id}`)
        .send(updateData)
        .set(defaultHeaders)
        .expect(HttpStatus.OK);

      expect(result.body).not.toBeUndefined();
      expect(updateUseCaseSpy).toHaveBeenNthCalledWith(
        1,
        id,
        updateData,
        defaultHeaders,
      );
    });

    it('Bad Request - Invalid id', async () => {
      const updateData: UpdateUsersDTO = {
        name: 'Update Test',
        email: 'updatetest@email.com',
        password: ')9#XSqVR',
      };

      const updateUseCaseSpy = jest.spyOn(updateUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .put(`/users/invalid-id`)
        .set({})
        .send(updateData)
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message).toEqual(
        expect.arrayContaining(['id must be a UUID']),
      );
      expect(updateUseCaseSpy).not.toBeCalled();
    });
  });
});
