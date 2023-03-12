import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { OwnersRepository } from '../../../repositories/owners.repository';
import { MockBuilderOwner } from '../../../utils/builders/owners.builder';
import { GetOwnerByIdUseCase } from '../../getById/getById.owners.useCase';
import { ActivateOwnersUseCase } from '../activate.owners.useCase';

describe('Activate Owners Use Case', () => {
  let activeUseCase: ActivateOwnersUseCase;
  let getByIdUseCase: GetOwnerByIdUseCase;
  let repository: OwnersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivateOwnersUseCase,
        GetOwnerByIdUseCase,
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    activeUseCase = module.get<ActivateOwnersUseCase>(ActivateOwnersUseCase);

    getByIdUseCase = module.get<GetOwnerByIdUseCase>(GetOwnerByIdUseCase);

    repository = await module.resolve<OwnersRepository>(
      getRepositoryToken(OwnersRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(activeUseCase).toBeDefined();
    expect(getByIdUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  const user_id = uuid();
  const defaultHeaders = {
    username: 'name',
    useremail: 'name@name.com',
    user_id,
  };

  it('Should be able activate a owner', async () => {
    const id = uuid();

    const inactivation_date = new Date();

    const createOwner = new MockBuilderOwner()
      .withActive(true)
      .buildAll() as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(createOwner);

    const mockActivate = {
      id,
      active: true,
      inactivation_date: null,
      updated_by_email: defaultHeaders.useremail,
      updated_by_name: defaultHeaders.username,
    } as any;

    const expectedRes = {
      ...createOwner,
      ...mockActivate,
    };

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(expectedRes);

    jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => inactivation_date as any);

    await activeUseCase.execute(id, defaultHeaders);

    expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
    expect(saveSpy).toHaveBeenNthCalledWith(1, mockActivate);
  });
});
