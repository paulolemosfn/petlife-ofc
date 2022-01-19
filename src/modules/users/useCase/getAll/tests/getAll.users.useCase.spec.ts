import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersRepository } from '../../../../../modules/users/repositories/users.repository';
import { GetAllUsersUseCase } from '../getAll.users.useCase';

describe('Get All Users', () => {
  let getAllUseCase: GetAllUsersUseCase;
  let repository: UsersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUsersUseCase,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    getAllUseCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);

    repository = await module.resolve<UsersRepository>(
      getRepositoryToken(UsersRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(getAllUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should be return the all users', async () => {
    const queryParams = {};

    const mockedResponse = [
      [{ name: 'Cristiano' }, { name: 'Ronaldo' }],
    ] as any;

    jest.spyOn(repository, 'find').mockResolvedValue(mockedResponse);

    const getAll = await getAllUseCase.execute(queryParams);

    expect(getAll).toEqual(mockedResponse);
  });
});
