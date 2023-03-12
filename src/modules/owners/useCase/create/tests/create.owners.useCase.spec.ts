import { GetUsersByIdUseCase } from './../../../../users/useCase/getById/getById.users.useCase';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OwnersRepository } from './../../../repositories/owners.repository';
import { CreateOwnersUseCase } from './../create.owners.useCase';
import { UsersRepository } from '../../../../../modules/users/repositories/users.repository';
import { MockBuilderUser } from '../../../../users/utils/builders/users.builder';
import { MockBuilderOwner } from '../../../utils/builders/owners.builder';
import { BadRequestException } from '@nestjs/common';

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
            save: jest.fn(),
            getOwnerByUserId: jest.fn(),
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

  const user_id = uuid();

  it('should be able to create a new owner', async () => {
    const mockUser = new MockBuilderUser().withActive(true).buildAll() as any;

    const createOwner = new MockBuilderOwner()
      .withActive(true)
      .buildAll() as any;

    const defaultHeaders = {
      username: createOwner.created_by_name,
      useremail: createOwner.created_by_email,
      user_id,
    };

    const usersFoundSpy = jest
      .spyOn(getUserById, 'execute')
      .mockResolvedValue(mockUser);

    const getOwnerByIdSpy = jest
      .spyOn(repository, 'getOwnerByUserId')
      .mockResolvedValue(undefined);

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
    expect(getOwnerByIdSpy).toHaveBeenNthCalledWith(1, user_id);
    expect(saveSpy).toHaveBeenNthCalledWith(1, expectedRes);
  });

  it('Bad Request Exception - There is already a pet owner registered for the user ${userFound.name}', async () => {
    const mockUser = new MockBuilderUser()
      .withId(user_id)
      .withActive(true)
      .buildAll() as any;

    const createOwner = new MockBuilderOwner()
      .withActive(true)
      .buildAll() as any;

    const defaultHeaders = {
      username: createOwner.created_by_name,
      useremail: createOwner.created_by_email,
      user_id,
    };

    const usersFoundSpy = jest
      .spyOn(getUserById, 'execute')
      .mockResolvedValue(mockUser);

    const getOwnerByIdSpy = jest
      .spyOn(repository, 'getOwnerByUserId')
      .mockResolvedValue(createOwner);

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await createUseCase.execute({ owner_name: 'Teste' }, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe(
        `There is already a pet owner registered for the user ${mockUser.name}`,
      );
      expect(error.status).toBe(400);
      expect(error).toBeInstanceOf(BadRequestException);
      expect(usersFoundSpy).toHaveBeenNthCalledWith(
        1,
        mockUser.id,
        defaultHeaders,
      );
      expect(getOwnerByIdSpy).toHaveBeenNthCalledWith(1, mockUser.id);
      expect(saveSpy).not.toBeCalled();
    }
  });
});
