import { TestingModule, Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetOwnerByIdUseCase } from '../getById.owners.useCase';
import { OwnersRepository } from '../../../../../modules/owners/repositories/owners.repository';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';

describe('Get Owner By Id', () => {
  let getByIdUseCase: GetOwnerByIdUseCase;
  let repository: OwnersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOwnerByIdUseCase,
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    getByIdUseCase = module.get<GetOwnerByIdUseCase>(GetOwnerByIdUseCase);

    repository = await module.resolve<OwnersRepository>(
      getRepositoryToken(OwnersRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(getByIdUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  const user_id = uuid();

  const defaultHeaders: DefaultHeadersInterface = {
    user_id,
    username: 'Create Test',
    useremail: 'create@test.com',
  };

  it('should be get a owner by id', async () => {
    const id = uuid();

    const getByIdSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(<any>id);

    const result = await getByIdUseCase.execute(id, defaultHeaders);

    expect(result).toEqual(id);
    expect(getByIdSpy).toHaveBeenNthCalledWith(1, {
      where: { id, user_id, active: true },
    });
  });

  it('should throw a NotFoundException', async () => {
    expect.hasAssertions();

    const id = 'invalid-id';

    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    try {
      await getByIdUseCase.execute(id, defaultHeaders);
    } catch (error) {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Owner not found');
    }
  });
});
