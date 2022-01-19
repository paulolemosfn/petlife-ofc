import { GetUsersByIdUseCase } from './../../../../users/useCase/getById/getById.users.useCase';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OwnersRepository } from './../../../repositories/owners.repository';
import { CreateOwnersUseCase } from './../create.owners.useCase';
import { UsersRepository } from '../../../../../modules/users/repositories/users.repository';
import { ConflictException } from '@nestjs/common';

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
            findOne: jest.fn(),
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
    ownersQuantity: 5,
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
      owners: [
        {
          active: true,
          inactivation_date: null,
          created_at: '2021-12-24T05:52:11.739Z',
          updated_at: '2021-12-24T05:52:11.739Z',
          created_by_name: 'NETO',
          created_by_email: 'NETO@NETO.com.br',
          updated_by_name: 'NETO',
          updated_by_email: 'NETO@NETO.com.br',
          id: '22faf267-ac2a-4287-b64e-f01bd96d1362',
          user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
          owner_name: 'Netão',
          code: 'DN01',
        },
        {
          active: true,
          inactivation_date: null,
          created_at: '2021-12-24T05:52:21.059Z',
          updated_at: '2021-12-24T05:52:21.059Z',
          created_by_name: 'NETO',
          created_by_email: 'NETO@NETO.com.br',
          updated_by_name: 'NETO',
          updated_by_email: 'NETO@NETO.com.br',
          id: 'f3c2daa3-b201-458f-a70e-d06c41eb048d',
          user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
          owner_name: 'Netão',
          code: 'DN02',
        },
        {
          active: true,
          inactivation_date: null,
          created_at: '2022-01-07T21:50:44.016Z',
          updated_at: '2022-01-07T21:50:44.016Z',
          created_by_name: 'NETO',
          created_by_email: 'NETO@NETO.com.br',
          updated_by_name: 'NETO',
          updated_by_email: 'NETO@NETO.com.br',
          id: '89574777-5632-400b-b1cc-63850f0f1ca8',
          user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
          owner_name: 'Netão',
          code: 'DN06',
        },
      ],
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
      code: 'DN06',
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

    const ownersFoundSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(undefined);

    const expectedRes = {
      ...createOwner,
      user_id,
    };

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(<any>expectedRes);

    const result = await createUseCase.execute(expectedRes, defaultHeaders);

    expect(result).toEqual(expectedRes);
    expect(ownersFoundSpy).toHaveBeenNthCalledWith(1, {
      where: { code: 'DN06' },
    });
    expect(usersFoundSpy).toHaveBeenNthCalledWith(1, user_id, defaultHeaders);
    expect(saveSpy).toHaveBeenNthCalledWith(1, expectedRes);
  });

  it('should not be able create a new owner when the code already exists', async () => {
    expect.hasAssertions();

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
      owners: [
        {
          active: true,
          inactivation_date: null,
          created_at: '2021-12-24T05:52:11.739Z',
          updated_at: '2021-12-24T05:52:11.739Z',
          created_by_name: 'NETO',
          created_by_email: 'NETO@NETO.com.br',
          updated_by_name: 'NETO',
          updated_by_email: 'NETO@NETO.com.br',
          id: '22faf267-ac2a-4287-b64e-f01bd96d1362',
          user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
          owner_name: 'Netão',
          code: 'DN01',
        },
        {
          active: true,
          inactivation_date: null,
          created_at: '2021-12-24T05:52:21.059Z',
          updated_at: '2021-12-24T05:52:21.059Z',
          created_by_name: 'NETO',
          created_by_email: 'NETO@NETO.com.br',
          updated_by_name: 'NETO',
          updated_by_email: 'NETO@NETO.com.br',
          id: 'f3c2daa3-b201-458f-a70e-d06c41eb048d',
          user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
          owner_name: 'Netão',
          code: 'DN02',
        },
        {
          active: true,
          inactivation_date: null,
          created_at: '2022-01-07T21:50:44.016Z',
          updated_at: '2022-01-07T21:50:44.016Z',
          created_by_name: 'NETO',
          created_by_email: 'NETO@NETO.com.br',
          updated_by_name: 'NETO',
          updated_by_email: 'NETO@NETO.com.br',
          id: '89574777-5632-400b-b1cc-63850f0f1ca8',
          user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
          owner_name: 'Netão',
          code: 'DN01',
        },
      ],
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

    const ownersFoundSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(createOwner.code as any);

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await createUseCase.execute(createOwner, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe('This code has already been registered');
      expect(error.status).toBe(409);
      expect(error).toBeInstanceOf(ConflictException);
      expect(usersFoundSpy).toHaveBeenNthCalledWith(1, user_id, defaultHeaders);
      expect(ownersFoundSpy).toHaveBeenNthCalledWith(1, {
        where: { code: 'DN06' },
      });
      expect(saveSpy).not.toBeCalled;
    }
  });
});
