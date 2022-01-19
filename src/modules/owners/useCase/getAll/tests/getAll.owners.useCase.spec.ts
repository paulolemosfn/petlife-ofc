import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OwnersRepository } from '../../../../../modules/owners/repositories/owners.repository';
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
            find: jest.fn(),
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

  it('should be return the all owners', async () => {
    const queryParams = {};

    const mockedResponse = [
      [{ name: 'Cristiano' }, { name: 'Ronaldo' }],
    ] as any;

    jest.spyOn(repository, 'find').mockResolvedValue(mockedResponse);

    const getAll = await getAllUseCase.execute(queryParams);

    expect(getAll).toEqual(mockedResponse);
  });
});
