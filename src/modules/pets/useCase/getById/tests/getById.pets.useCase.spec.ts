import { TestingModule, Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetPetByIdUseCase } from '../getById.pets.useCase';
import { PetsRepository } from '../../../../../modules/pets/repositories/pets.repository';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';

describe('Get Pet By Id', () => {
  let getByIdUseCase: GetPetByIdUseCase;
  let repository: PetsRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPetByIdUseCase,
        {
          provide: getRepositoryToken(PetsRepository),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    getByIdUseCase = module.get<GetPetByIdUseCase>(GetPetByIdUseCase);

    repository = await module.resolve<PetsRepository>(
      getRepositoryToken(PetsRepository),
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

  it('should be get a Pet by id', async () => {
    const id = uuid();

    const getByIdSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(<any>id);

    const result = await getByIdUseCase.execute(id, defaultHeaders);

    expect(result).toEqual(id);
    expect(getByIdSpy).toHaveBeenNthCalledWith(1, {
      where: { id, user_id },
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
      expect(error.message).toEqual('Pet not found');
    }
  });
});
