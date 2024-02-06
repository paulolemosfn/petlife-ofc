import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';
import { OwnersRepository } from '../../../../owners/repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../../../../owners/useCase/getById/getById.owners.useCase';
import { PetsRepository } from '../../../../pets/repositories/pets.repository';
import { GetPetByIdUseCase } from '../../../../pets/useCase/getById/getById.pets.useCase';
import { ActivityRepository } from '../../../repositories/activity.repository';
import { MockBuilderActivity } from '../../../utils/builders/activity.builder';
import { CreateActivityController } from '../create.activity.controller';
import { CreateActivityDTO } from '../create.activity.dto';
import { CreateActivityUseCase } from '../create.activity.useCase';
import { ActivityEntity } from '../../../entities/activity.entity';

describe('Create activity Controller Tests', () => {
  let app: INestApplication;
  let createUseCase: CreateActivityUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CreateActivityController],
      providers: [
        CreateActivityUseCase,
        GetOwnerByIdUseCase,
        GetPetByIdUseCase,
        {
          provide: getRepositoryToken(ActivityRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(PetsRepository),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    createUseCase = moduleRef.get<CreateActivityUseCase>(CreateActivityUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('POST /Activity', () => {
    const user_id = uuid();
    const defaultHeaders: DefaultHeadersInterface = {
      user_id,
      username: 'Create Test',
      useremail: 'create@test.com',
    };

    it('Should create a activity', async () => {
      const createActivity =
        new MockBuilderActivity().buildAll() as ActivityEntity;

      const buildActivity: CreateActivityDTO = {
        activity: createActivity.activity,
        pet_id: createActivity.pet_id,
        owner_id: createActivity.owner_id,
      };

      const createUseCaseSpy = jest
        .spyOn(createUseCase, 'execute')
        .mockResolvedValue(createActivity);

      const result = await request(app.getHttpServer())
        .post(`/activity`)
        .set(defaultHeaders)
        .send(buildActivity)
        .expect(HttpStatus.CREATED);

      expect(result.body).toEqual(createActivity);
      expect(createUseCaseSpy).toHaveBeenNthCalledWith(
        1,
        buildActivity,
        defaultHeaders,
      );
    });

    it('Bad Request - Invalid params', async () => {
      const createUseCaseSpy = jest.spyOn(createUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .post(`/activity`)
        .set({})
        .send()
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message).toEqual(
        expect.arrayContaining([
          'pet_id should not be empty',
          'pet_id must be a UUID',
          'owner_id should not be empty',
          'owner_id must be a UUID',
          'activity should not be empty',
          'activity must be a string',
          'each value in activity must be a valid enum value',
        ]),
      );
      expect(createUseCaseSpy).not.toBeCalled();
    });
  });
});
