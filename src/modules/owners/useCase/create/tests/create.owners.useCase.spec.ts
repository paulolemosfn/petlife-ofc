import { GetUsersByIdUseCase } from './../../../../users/useCase/getById/getById.users.useCase';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OwnersRepository } from './../../../repositories/owners.repository';
import { CreateOwnersUseCase } from './../create.owners.useCase';
import { UsersRepository } from '../../../../../modules/users/repositories/users.repository';

describe('Create owners use case context', () => {
  let createUseCase: CreateOwnersUseCase;
  let repository: OwnersRepository;
  let getUserById: GetUsersByIdUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOwnersUseCase,
        GetUsersByIdUseCase,
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {
            count: jest.fn(),
            findAndCount: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    createUseCase = module.get<CreateOwnersUseCase>(CreateOwnersUseCase);

    getUserById = module.get<GetUsersByIdUseCase>(GetUsersByIdUseCase);

    repository = await module.resolve<OwnersRepository>(
      getRepositoryToken(OwnersRepository),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const buildowners = {
    owner_name: 'Name',
  };
  const user_id = uuid();

  it('should be able to create a new owner', async () => {
    const mockUser = {
      active: true,
      inactivation_date: null,
      created_at: '2021-12-24T05:50:49.830Z',
      updated_at: '2021-12-24T05:50:49.830Z',
      created_by_name: 'NETO',
      created_by_email: 'NETO@NETO.com.br',
      updated_by_name: 'NETO',
      updated_by_email: 'NETO@NETO.com.br',
      id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
      name: 'NETO',
      email: 'NETO@NETO.com.br',
      owners: [],
    } as any;

    const createOwner = {
      ...buildowners,
      created_at: '2021-12-20T18:25:10.415Z',
      created_by_name: 'create user name',
      created_by_email: 'create@teste.com.br',
      updated_at: '2021-12-20T18:25:10.416Z',
      updated_by_email: 'create@teste.com.br',
      updated_by_name: 'create user name',
      active: true,
      inactivation_date: '2021-12-20T18:25:10.416Z',
      id: 'fb5c9676-4e28-4daa-8efa-375512451f8f',
      code: 'DN01',
      user: { mockUser },
    };

    const defaultHeaders = {
      username: createOwner.created_by_name,
      useremail: createOwner.created_by_email,
      user_id,
    };

    const usersFoundSpy = jest
      .spyOn(getUserById, 'execute')
      .mockResolvedValue(mockUser);

    const ownersCountSpy = jest.spyOn(repository, 'count').mockResolvedValue(0);

    const expectedRes = {
      ...createOwner,
      user_id,
    } as any;

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(expectedRes);

    const result = await createUseCase.execute(expectedRes, defaultHeaders);

    expect(result).toEqual(expectedRes);
    expect(usersFoundSpy).toHaveBeenNthCalledWith(1, user_id, defaultHeaders);
    expect(ownersCountSpy).toHaveBeenNthCalledWith(1, []);
    expect(saveSpy).toHaveBeenNthCalledWith(1, expectedRes);
  });
});
