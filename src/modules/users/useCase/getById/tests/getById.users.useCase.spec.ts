import { TestingModule, Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersRepository } from '../../../../../modules/users/repositories/users.repository';
import { GetUsersByIdUseCase } from '../getById.users.useCase';

describe('Get User By Id', () => {
  let getByIdUseCase: GetUsersByIdUseCase;
  let repository: UsersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUsersByIdUseCase,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    getByIdUseCase = module.get<GetUsersByIdUseCase>(GetUsersByIdUseCase);

    repository = await module.resolve<UsersRepository>(
      getRepositoryToken(UsersRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(getByIdUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  const id = uuid();
  const user_id = id;

  const defaultHeaders = {
    username: 'teste',
    useremail: 'test@test.com',
    user_id,
  };

  it('should be find a user by id', async () => {
    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(<any>id);

    const result = await getByIdUseCase.execute(id, defaultHeaders);

    expect(result).toEqual(id);
    expect(findOneSpy).toHaveBeenNthCalledWith(1, { where: { id } });
  });

  it('Should throw a NotFoundException', async () => {
    expect.hasAssertions();

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(undefined);

    try {
      await getByIdUseCase.execute('invalid-id', defaultHeaders);
    } catch (error) {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('User not found');
      expect(findOneSpy).toHaveBeenNthCalledWith(1, {
        where: { id: 'invalid-id' },
      });
    }
  });
});
