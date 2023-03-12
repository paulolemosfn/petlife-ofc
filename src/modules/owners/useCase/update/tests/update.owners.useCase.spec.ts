import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { MockBuilderOwner } from '../../../utils/builders/owners.builder';
import { UpdateOwnersUseCase } from '../update.owners.useCase';
import { OwnersRepository } from './../../../repositories/owners.repository';
import { GetOwnerByIdUseCase } from './../../getById/getById.owners.useCase';

describe('Update owner use case', () => {
  let updateUseCase: UpdateOwnersUseCase;
  let repository: OwnersRepository;
  let getByIdUseCase: GetOwnerByIdUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateOwnersUseCase,
        GetOwnerByIdUseCase,
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    updateUseCase = module.get<UpdateOwnersUseCase>(UpdateOwnersUseCase);

    getByIdUseCase = module.get<GetOwnerByIdUseCase>(GetOwnerByIdUseCase);

    repository = await module.resolve<OwnersRepository>(
      getRepositoryToken(OwnersRepository),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const user_id = uuid();
  const defaultHeaders = {
    username: 'name',
    useremail: 'name@name.com',
    user_id,
  };

  it('should be update a owner', async () => {
    const ownerData = new MockBuilderOwner().withActive(true).buildAll() as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(ownerData);

    const updateBody = {
      owner_name: 'Cristiano Ronaldo',
    } as any;

    const expectedRes = {
      ...ownerData,
      ...updateBody,
      updated_by_name: defaultHeaders.username,
      updated_by_email: defaultHeaders.useremail,
    } as any;

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(expectedRes);

    const result = await updateUseCase.execute(
      ownerData.id,
      updateBody,
      defaultHeaders,
    );

    expect(result).toEqual(expectedRes);
    expect(getByIdSpy).toHaveBeenNthCalledWith(1, ownerData.id, defaultHeaders);
    expect(saveSpy).toHaveBeenNthCalledWith(1, expectedRes);
  });
});
