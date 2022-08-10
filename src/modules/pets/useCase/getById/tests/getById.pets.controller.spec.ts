import { PetsRepository } from './../../../repositories/pets.repository';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { GetPetByIdController } from '../getById.pets.controller';
import { GetPetByIdUseCase } from '../getById.pets.useCase';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';

describe('Get Pets By Id Controller Tests', () => {
  let app: INestApplication;
  let getByIdUseCase: GetPetByIdUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GetPetByIdController],
      providers: [
        GetPetByIdUseCase,
        {
          provide: getRepositoryToken(PetsRepository),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    getByIdUseCase = moduleRef.get<GetPetByIdUseCase>(GetPetByIdUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('GET /pets/:id', () => {
    it('should return Pet by id', async () => {
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
        .get(`/pets/${id}`)
        .set(defaultHeaders)
        .send()
        .expect(HttpStatus.OK);

      expect(result.body).toEqual(expectedRes);
      expect(getByIdUseCaseSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
    });

    it('Bad Request - Invalid params', async () => {
      const getByIdUseCaseSpy = jest.spyOn(getByIdUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .get(`/pets/invalid-id`)
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
