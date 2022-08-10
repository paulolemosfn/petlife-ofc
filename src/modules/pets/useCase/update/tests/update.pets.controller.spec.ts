import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';
import { PetsRepository } from '../../../repositories/pets.repository';
import { GetPetByIdUseCase } from '../../getById/getById.pets.useCase';
import { UpdatePetsController } from '../update.pets.controller';
import { UpdatePetsUseCase } from '../update.pets.useCase';

describe('Suites Tests Update Pet Controller', () => {
  let app: INestApplication;
  let updateUseCase: UpdatePetsUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UpdatePetsController],
      providers: [
        UpdatePetsUseCase,
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

    updateUseCase = moduleRef.get<UpdatePetsUseCase>(UpdatePetsUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('PUT /pets/{id}', () => {
    const id = uuid();
    const user_id = uuid();

    const defaultHeaders: DefaultHeadersInterface = {
      user_id,
      username: 'update Test',
      useremail: 'update@test.com',
    };

    it('Should update a Pet', async () => {
      const petData = {
        active: true,
        inactivation_date: null,
        created_at: '2022-02-17T06:30:18.047Z',
        updated_at: '2022-02-17T15:36:28.385Z',
        created_by_name: 'neto',
        created_by_email: 'neto@neto.com',
        updated_by_name: 'neto',
        updated_by_email: 'neto@neto.com',
        id,
        pet_name: 'Myke Douglas',
        user_id,
        pet_code: 'P003',
        breed: 'SRD',
        pet_type: 'Turtle',
        owner: [],
      } as any;

      const mockUseCaseRes = {
        ...petData,
        user_id,
      } as any;

      const updateBody = {
        pet_name: 'Cristiano Ronaldo',
      } as any;

      const updateUseCaseSpy = jest
        .spyOn(updateUseCase, 'execute')
        .mockResolvedValue({ ...mockUseCaseRes, ...updateBody });

      const result = await request(app.getHttpServer())
        .put(`/pets/${id}`)
        .set(defaultHeaders)
        .send(updateBody)
        .expect(HttpStatus.OK);

      expect(result.body).toEqual({ ...mockUseCaseRes, ...updateBody });
      expect(updateUseCaseSpy).toHaveBeenNthCalledWith(
        1,
        id,
        updateBody,
        defaultHeaders,
      );
    });

    it('Bad Request - Invalid Id', async () => {
      const updateUseCaseSpy = jest.spyOn(updateUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .put(`/pets/invalid-id`)
        .set({
          defaultHeaders,
        })
        .send()
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message[0]).toBe('id must be a UUID');
      expect(updateUseCaseSpy).not.toBeCalled();
    });
  });
});
