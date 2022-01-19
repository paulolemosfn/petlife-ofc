import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersRepository } from './../../../repositories/users.repository';
import { CreateUsersUseCase } from './../create.users.useCase';
import { BadRequestException } from '@nestjs/common';

describe('Create users use case context', () => {
  let createUseCase: CreateUsersUseCase;
  let repository: UsersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUsersUseCase,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createUseCase = module.get<CreateUsersUseCase>(CreateUsersUseCase);

    repository = await module.resolve<UsersRepository>(
      getRepositoryToken(UsersRepository),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to create a new user', async () => {
    const buildUsers = {
      name: 'NETO',
      email: '4NETO@NETO.com.br',
      password: '%?luZkP1JN7j',
    };

    const expectedRes = {
      ...buildUsers,
      created_by_name: buildUsers.name,
      created_by_email: buildUsers.email,
      updated_by_name: buildUsers.name,
      updated_by_email: buildUsers.email,
      active: true,
    } as any;

    const emailFilter = { where: { email: buildUsers.email } };

    const findEmailSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(undefined);

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(expectedRes);

    const result = await createUseCase.execute(buildUsers);

    expect(result).toEqual(expectedRes);
    expect(findEmailSpy).toHaveBeenNthCalledWith(1, emailFilter);
    expect(saveSpy).toHaveBeenNthCalledWith(1, expectedRes);
  });

  it('should not be able to create a new user', async () => {
    expect.hasAssertions();

    const email = 'test@petlife.com';

    const buildUsers = {
      name: 'NETO',
      email,
      password: '%?luZkP1JN7j',
    };

    const findEmailSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(<any>email);

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await createUseCase.execute(buildUsers);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe(
        `The email ${email} has already been registered`,
      );
      expect(error.status).toBe(400);
      expect(findEmailSpy).toHaveBeenNthCalledWith(1, { where: { email } });
      expect(saveSpy).not.toBeCalled();
    }
  });
});
