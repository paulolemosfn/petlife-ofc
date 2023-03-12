import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { OwnersRepository } from '../../../repositories/owners.repository';
import { MockBuilderOwner } from '../../../utils/builders/owners.builder';
import { GetOwnerByIdUseCase } from '../../getById/getById.owners.useCase';
import { InactivateOwnersUseCase } from '../inactivate.owners.useCase';

describe('Inactivate Owners Use Case', () => {
  let inactivateUseCase: InactivateOwnersUseCase;
  let getByIdUseCase: GetOwnerByIdUseCase;
  let repository: OwnersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InactivateOwnersUseCase,
        GetOwnerByIdUseCase,
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    inactivateUseCase = module.get<InactivateOwnersUseCase>(
      InactivateOwnersUseCase,
    );

    getByIdUseCase = module.get<GetOwnerByIdUseCase>(GetOwnerByIdUseCase);

    repository = await module.resolve<OwnersRepository>(
      getRepositoryToken(OwnersRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(inactivateUseCase).toBeDefined();
    expect(getByIdUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  const user_id = uuid();
  const defaultHeaders = {
    username: 'name',
    useremail: 'name@name.com',
    user_id,
  };

  it('Should be able inactivate a owner', async () => {
    const id = uuid();
    const inactivation_date = new Date();

    const createOwner = new MockBuilderOwner()
      .withActive(true)
      .buildAll() as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(createOwner);

    const mockInactivate = {
      id,
      active: false,
      inactivation_date,
      updated_by_email: defaultHeaders.useremail,
      updated_by_name: defaultHeaders.username,
    } as any;

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue({ ...createOwner, active: false });

    jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => inactivation_date as any);

    await inactivateUseCase.execute(id, defaultHeaders);

    expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
    expect(saveSpy).toHaveBeenNthCalledWith(1, mockInactivate);
  });
});
