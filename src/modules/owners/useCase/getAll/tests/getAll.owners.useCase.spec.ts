import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { OwnersRepository } from '../../../../../modules/owners/repositories/owners.repository';
import { MockBuilderOwner } from '../../../utils/builders/owners.builder';
import { GetAllOwnersUseCase } from '../getAll.owners.useCase';

describe('Get All owners', () => {
  let getAllUseCase: GetAllOwnersUseCase;
  let repository: OwnersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllOwnersUseCase,
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    getAllUseCase = module.get<GetAllOwnersUseCase>(GetAllOwnersUseCase);

    repository = await module.resolve<OwnersRepository>(
      getRepositoryToken(OwnersRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(getAllUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  const user_id = uuid();

  const ownersData = new MockBuilderOwner().buildAll();

  const defaultHeaders = {
    username: ownersData.created_by_name,
    useremail: ownersData.created_by_email,
    user_id,
  };

  it('should be return the all owners', async () => {
    const queryParams = {} as any;

    const mockedResponse = { count: 2, data: [ownersData, ownersData] } as any;

    const repositorySpy = jest
      .spyOn(repository, 'getAll')
      .mockResolvedValue(mockedResponse);

    const getAll = await getAllUseCase.execute(
      queryParams,
      defaultHeaders,
      true,
    );

    expect(getAll).toEqual(mockedResponse);
    expect(repositorySpy).toHaveBeenNthCalledWith(1, {
      ...queryParams,
      showInactive: 'true',
    });
  });
});
