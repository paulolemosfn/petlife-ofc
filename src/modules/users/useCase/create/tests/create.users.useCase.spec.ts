import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockBuilderUser } from '../../../utils/builders/users.builder';
import { UsersRepository } from './../../../repositories/users.repository';
import { CreateUsersUseCase } from './../create.users.useCase';

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
    const buildUsers = new MockBuilderUser().buildAll();

    const userRequestData = {
      ...buildUsers,
      confirmPassword: buildUsers.password,
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

    const result = await createUseCase.execute(userRequestData);

    expect(result).toEqual(expectedRes);
    expect(findEmailSpy).toHaveBeenNthCalledWith(1, emailFilter);
    expect(saveSpy).toHaveBeenCalledTimes(1);
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
        `The email ${email} has already been registered for other user`,
      );
      expect(error.status).toBe(400);
      expect(findEmailSpy).toHaveBeenNthCalledWith(1, { where: { email } });
      expect(saveSpy).not.toBeCalled();
    }
  });
});
