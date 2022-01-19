import { OwnersRepository } from './../../../repositories/owners.repository';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { GetOwnerByIdController } from '../getById.owners.controller';
import { GetOwnerByIdUseCase } from '../getById.owners.useCase';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';

describe('Get Owners By Id Controller Tests', () => {
  let app: INestApplication;
  let getByIdUseCase: GetOwnerByIdUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GetOwnerByIdController],
      providers: [
        GetOwnerByIdUseCase,
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    getByIdUseCase = moduleRef.get<GetOwnerByIdUseCase>(GetOwnerByIdUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('GET /owners/:id', () => {
    it('should return owner by id', async () => {
      const id = uuid();
      const user_id = uuid();
      const defaultHeaders: DefaultHeadersInterface = {
        user_id,
        username: 'Create Test',
        useremail: 'create@test.com',
      };

      const expectedRes = { id, defaultHeaders } as any;

      const getByIdUseCaseSpy = jest
        .spyOn(getByIdUseCase, 'execute')
        .mockResolvedValue(expectedRes);

      const result = await request(app.getHttpServer())
        .get(`/owners/${id}`)
        .set(defaultHeaders)
        .send()
        .expect(HttpStatus.OK);

      expect(result.body).toEqual(expectedRes);
      expect(getByIdUseCaseSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
    });

    it('Bad Request - Invalid params', async () => {
      const getByIdUseCaseSpy = jest.spyOn(getByIdUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .get(`/owners/invalid-id`)
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
