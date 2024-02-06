import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { formatDate } from '../../../../../common/utils/date';
import { OwnersEntity } from '../../../../owners/entities/owners.entity';
import { OwnersRepository } from '../../../../owners/repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../../../../owners/useCase/getById/getById.owners.useCase';
import { MockBuilderOwner } from '../../../../owners/utils/builders/owners.builder';
import { PetsRepository } from '../../../../pets/repositories/pets.repository';
import { GetPetByIdUseCase } from '../../../../pets/useCase/getById/getById.pets.useCase';
import { ActivityEntity } from '../../../entities/activity.entity';
import { ActivityRepository } from '../../../repositories/activity.repository';
import { MockBuilderActivity } from '../../../utils/builders/activity.builder';
import { CreateActivityUseCase } from '../create.activity.useCase';

describe('Create activity use case context', () => {
  let createUseCase: CreateActivityUseCase;
  let repository: ActivityRepository;
  let getOwnerById: GetOwnerByIdUseCase;
  let getPetById: GetPetByIdUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateActivityUseCase,
        GetOwnerByIdUseCase,
        GetPetByIdUseCase,
        {
          provide: getRepositoryToken(ActivityRepository),
          useValue: {
            save: jest.fn(),
            getOwnerByUserId: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(PetsRepository),
          useValue: {},
        },
      ],
    }).compile();

    createUseCase = module.get<CreateActivityUseCase>(CreateActivityUseCase);

    getOwnerById = module.get<GetOwnerByIdUseCase>(GetOwnerByIdUseCase);

    getPetById = module.get<GetPetByIdUseCase>(GetPetByIdUseCase);

    repository = await module.resolve<ActivityRepository>(
      getRepositoryToken(ActivityRepository),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const user_id = uuid();

  it('should be able to create a new owner', async () => {
    const createOwner = new MockBuilderOwner()
      .withActive(true)
      .withCreatedByEmail()
      .withCreatedByName()
      .buildAll() as OwnersEntity;

    const createActivity = new MockBuilderActivity()
      .withActive(true)
      .buildAll() as ActivityEntity;

    const defaultHeaders = {
      username: createOwner.created_by_name,
      useremail: createOwner.created_by_email,
      user_id,
    };

    const getOwnerByIdSpy = jest
      .spyOn(getOwnerById, 'execute')
      .mockResolvedValue(undefined);

    const getPetByIdSpy = jest
      .spyOn(getPetById, 'execute')
      .mockResolvedValue(undefined);

    const expectedRes = {
      ...createActivity,
      ...defaultHeaders,
      activity_date: formatDate(new Date()),
      activity_hour: format(new Date(), 'HH:mm'),
      created_by: defaultHeaders.username,
      created_by_name: defaultHeaders.username,
      updated_by_name: defaultHeaders.username,
      created_by_email: defaultHeaders.useremail,
      updated_by_email: defaultHeaders.useremail,
      user_id,
    } as any;

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(expectedRes);

    const result = await createUseCase.execute(expectedRes, defaultHeaders);

    expect(result).toEqual(expectedRes);
    expect(getPetByIdSpy).toHaveBeenNthCalledWith(
      1,
      createActivity.pet_id,
      defaultHeaders,
    );
    expect(getOwnerByIdSpy).toHaveBeenNthCalledWith(
      1,
      createActivity.owner_id,
      defaultHeaders,
    );
    expect(saveSpy).toHaveBeenNthCalledWith(1, expectedRes);
  });
});
