import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { UsersRepository } from '../../../repositories/users.repository';
import { GetUsersByIdUseCase } from '../../getById/getById.users.useCase';
import { ActivateUsersUseCase } from '../activate.users.useCase';

describe('Activate Users Use Case', () => {
  let activeUseCase: ActivateUsersUseCase;
  let getByIdUseCase: GetUsersByIdUseCase;
  let repository: UsersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivateUsersUseCase,
        GetUsersByIdUseCase,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    activeUseCase = module.get<ActivateUsersUseCase>(ActivateUsersUseCase);

    getByIdUseCase = module.get<GetUsersByIdUseCase>(GetUsersByIdUseCase);

    repository = await module.resolve<UsersRepository>(
      getRepositoryToken(UsersRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(activeUseCase).toBeDefined();
    expect(getByIdUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  const user_id = uuid();
  const defaultHeaders = {
    username: 'name',
    useremail: 'name@name.com',
    user_id,
  };

  it('Should be able activate a Users', async () => {
    const id = uuid();

    const inactivation_date = new Date();

    const createdUsers = {
      active: false,
      inactivation_date,
      created_at: '2021-12-24T05:49:23.502Z',
      updated_at: '2021-12-24T05:49:23.502Z',
      created_by_name: 'NETO',
      created_by_email: '4NETO@NETO.com.br',
      updated_by_name: 'NETO',
      updated_by_email: '4NETO@NETO.com.br',
      id,
      name: 'NETO',
      email: '4NETO@NETO.com.br',
      owners: [],
    } as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(createdUsers);

    const mockActivate = {
      id,
      active: true,
      inactivation_date: null,
      updated_by_email: defaultHeaders.useremail,
      updated_by_name: defaultHeaders.username,
    } as any;

    const expectedRes = {
      ...createdUsers,
      ...mockActivate,
    };

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(expectedRes);

    jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => inactivation_date as any);

    const result = await activeUseCase.execute(id, defaultHeaders);

    expect(result).toEqual(expectedRes);
    expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
    expect(saveSpy).toHaveBeenNthCalledWith(1, mockActivate);
  });

  it('Not Found Exception - User not found', async () => {
    expect.hasAssertions();

    const id = 'invalid-id';

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(undefined);

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await activeUseCase.execute(id, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe('User not found');
      expect(error.status).toBe(404);
      expect(error).toBeInstanceOf(NotFoundException);
      expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
      expect(saveSpy).not.toBeCalled();
    }
  });

  it('Bad Request Exception - This user already active', async () => {
    expect.hasAssertions();

    const id = uuid();

    const createdUsers = {
      active: true,
      inactivation_date: null,
      created_at: '2021-12-24T05:49:23.502Z',
      updated_at: '2021-12-24T05:49:23.502Z',
      created_by_name: 'NETO',
      created_by_email: '4NETO@NETO.com.br',
      updated_by_name: 'NETO',
      updated_by_email: '4NETO@NETO.com.br',
      id,
      name: 'NETO',
      email: '4NETO@NETO.com.br',
      owners: [],
    } as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(createdUsers);

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await activeUseCase.execute(id, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe('This user already active');
      expect(error.status).toBe(400);
      expect(error).toBeInstanceOf(BadRequestException);
      expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
      expect(saveSpy).not.toBeCalled();
    }
  });
});
