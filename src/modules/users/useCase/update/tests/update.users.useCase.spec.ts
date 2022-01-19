import { v4 as uuid } from 'uuid';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersRepository } from '../../../../../modules/users/repositories/users.repository';
import { GetUsersByIdUseCase } from '../../getById/getById.users.useCase';
import { UpdateUsersUseCase } from '../update.users.useCase';
import { BadRequestException } from '@nestjs/common';

describe('Update Users Use Case', () => {
  let updateUseCase: UpdateUsersUseCase;
  let repository: UsersRepository;
  let getByIdUseCase: GetUsersByIdUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUsersUseCase,
        GetUsersByIdUseCase,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {
            findByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    updateUseCase = module.get<UpdateUsersUseCase>(UpdateUsersUseCase);

    repository = await module.resolve<UsersRepository>(
      getRepositoryToken(UsersRepository),
    );
    getByIdUseCase = module.get<GetUsersByIdUseCase>(GetUsersByIdUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const user_id = uuid();

  const defaultHeaders = {
    username: 'teste',
    useremail: 'test@test.com',
    user_id,
  };

  it('should be able update a user', async () => {
    const id = uuid();

    const buildedUsers = {
      updated_by_name: 'NETO',
      updated_by_email: '4NETO@NETO.com.br',
      id,
      name: 'NETO',
      email: '4NETO@NETO.com.br',
    } as any;

    const updateBody = {
      name: 'Update Test',
      email: 'updatetest@email.com',
    } as any;

    const expectedRes = {
      ...buildedUsers,
      ...updateBody,
      updated_by_name: defaultHeaders.username,
      updated_by_email: defaultHeaders.useremail,
    } as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(buildedUsers);

    const findByEmailSpy = jest
      .spyOn(repository, 'findByEmail')
      .mockReturnValue(undefined);

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(expectedRes);

    const result = await updateUseCase.execute(id, updateBody, defaultHeaders);

    expect(result).toEqual(expectedRes);
    expect(getByIdSpy).toHaveBeenNthCalledWith(
      1,
      buildedUsers.id,
      defaultHeaders,
    );
    expect(findByEmailSpy).toHaveBeenNthCalledWith(1, 'updatetest@email.com');
    expect(saveSpy).toHaveBeenNthCalledWith(1, expectedRes);
  });

  it('Bad Request - should not update a user with the email already exists', async () => {
    expect.hasAssertions();

    const id = uuid();
    const email = 'updatetest@email.com';

    const buildedUsers = {
      updated_by_name: 'NETO',
      updated_by_email: '4NETO@NETO.com.br',
      id,
      name: 'NETO',
      email: '4NETO@NETO.com.br',
    } as any;

    const updateBody = {
      name: 'Update Test',
      email: 'updatetest@email.com',
    } as any;

    const expectedRes = {
      ...buildedUsers,
      ...updateBody,
      updated_by_name: defaultHeaders.username,
      updated_by_email: defaultHeaders.useremail,
    } as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(buildedUsers);

    const findByEmailSpy = jest
      .spyOn(repository, 'findByEmail')
      .mockReturnValue(email as any);

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(expectedRes);

    try {
      await updateUseCase.execute(id, updateBody, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe(
        `The user with the email: ${email} already exists`,
      );
      expect(error.status).toBe(400);
      expect(error).toBeInstanceOf(BadRequestException);
      expect(getByIdSpy).toHaveBeenNthCalledWith(
        1,
        buildedUsers.id,
        defaultHeaders,
      );
      expect(findByEmailSpy).toHaveBeenNthCalledWith(1, 'updatetest@email.com');
      expect(saveSpy).not.toBeCalled;
    }
  });

  it("Bad Request - should not update a user when send the password and dont't send the email or name", async () => {
    expect.hasAssertions();

    const id = uuid();

    const updateBody = {
      password: '12345678',
    } as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(<any>id);

    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await updateUseCase.execute(id, updateBody, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe(
        `You needed send the new password, name and email!`,
      );
      expect(error.status).toBe(400);
      expect(error).toBeInstanceOf(BadRequestException);
      expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
      expect(findByEmailSpy).not.toBeCalled;
      expect(saveSpy).not.toBeCalled;
    }
  });

  it('Bad Request - should not update a inactive user', async () => {
    expect.hasAssertions();

    const id = uuid();
    const inactivation_date = new Date();

    const buildedUsers = {
      active: false,
      inactivation_date,
      updated_by_name: 'NETO',
      updated_by_email: '4NETO@NETO.com.br',
      id,
      name: 'NETO',
      email: '4NETO@NETO.com.br',
    } as any;

    const updateBody = {
      name: 'Update Test',
      email: 'updatetest@email.com',
    } as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(buildedUsers);

    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await updateUseCase.execute(id, updateBody, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe(`You cannot update an inactive user`);
      expect(error.status).toBe(400);
      expect(error).toBeInstanceOf(BadRequestException);
      expect(getByIdSpy).toHaveBeenNthCalledWith(
        1,
        buildedUsers.id,
        defaultHeaders,
      );
      expect(findByEmailSpy).not.toBeCalled;
      expect(saveSpy).not.toBeCalled;
    }
  });
});
