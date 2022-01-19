import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { OwnersRepository } from '../../../repositories/owners.repository';
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

    const createdOwner = {
      active: false,
      created_by_name: 'NETO',
      created_by_email: 'NETO@NETO.com.br',
      updated_by_name: 'NETO',
      updated_by_email: 'NETO@NETO.com.br',
      user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
      owner_name: 'Netão',
      code: 'DN10',
      user: {
        active: true,
        inactivation_date: null,
        created_at: '2021-12-24T05:50:49.830Z',
        updated_at: '2021-12-24T05:50:49.830Z',
        created_by_name: 'NETO',
        created_by_email: 'NETO@NETO.com.br',
        updated_by_name: 'NETO',
        updated_by_email: 'NETO@NETO.com.br',
        id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
        name: 'NETO',
        email: 'NETO@NETO.com.br',
        owners: [
          {
            active: true,
            inactivation_date: null,
            created_at: '2021-12-24T05:52:11.739Z',
            updated_at: '2021-12-24T05:52:11.739Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: '22faf267-ac2a-4287-b64e-f01bd96d1362',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN01',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2021-12-24T05:52:21.059Z',
            updated_at: '2021-12-24T05:52:21.059Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: 'f3c2daa3-b201-458f-a70e-d06c41eb048d',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN02',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2022-01-07T21:50:44.016Z',
            updated_at: '2022-01-07T21:50:44.016Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: '89574777-5632-400b-b1cc-63850f0f1ca8',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN06',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2022-01-07T22:49:46.638Z',
            updated_at: '2022-01-07T22:49:46.638Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: 'd0290bf1-ebba-47bb-953d-ca1653d387b9',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN07',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2022-01-08T02:38:38.449Z',
            updated_at: '2022-01-08T02:38:38.449Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: '963fecff-f853-4fe2-878d-4c5dac6c2c48',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN07',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2022-01-08T02:38:39.905Z',
            updated_at: '2022-01-08T02:38:39.905Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: 'd3479a86-e0f2-4a6c-9c90-819684a447ab',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN07',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2022-01-08T02:43:27.879Z',
            updated_at: '2022-01-08T02:43:27.879Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: 'e9a9a6ec-14bf-48b6-b596-65fa27500b40',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN09',
          },
        ],
      },
      inactivation_date,
      created_at: '2022-01-08T02:43:37.261Z',
      updated_at: '2022-01-08T02:43:37.261Z',
      id,
    } as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(createdOwner);

    const mockActivate = {
      id,
      active: true,
      inactivation_date: null,
      updated_by_email: defaultHeaders.useremail,
      updated_by_name: defaultHeaders.username,
    } as any;

    const expectedRes = {
      ...createdOwner,
      ...mockActivate,
    };

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(expectedRes);

    jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => inactivation_date as any);

    const result = await activeUseCase.execute(id, defaultHeaders);

    expect(result).toEqual(expectedRes);
    expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
    expect(saveSpy).toHaveBeenNthCalledWith(1, mockActivate);
  });

  it('Not Found Exception - Owner not found', async () => {
    expect.hasAssertions();

    const id = 'invalid-id';

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(undefined);

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await activeUseCase.execute(id, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe('Owner not found');
      expect(error.status).toBe(404);
      expect(error).toBeInstanceOf(NotFoundException);
      expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
      expect(saveSpy).not.toBeCalled();
    }
  });

  it('Bad Request Exception - This owner already active', async () => {
    expect.hasAssertions();

    const id = uuid();

    const inactivation_date = new Date();

    const createdOwner = {
      active: true,
      created_by_name: 'NETO',
      created_by_email: 'NETO@NETO.com.br',
      updated_by_name: 'NETO',
      updated_by_email: 'NETO@NETO.com.br',
      user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
      owner_name: 'Netão',
      code: 'DN10',
      user: {
        active: true,
        inactivation_date: null,
        created_at: '2021-12-24T05:50:49.830Z',
        updated_at: '2021-12-24T05:50:49.830Z',
        created_by_name: 'NETO',
        created_by_email: 'NETO@NETO.com.br',
        updated_by_name: 'NETO',
        updated_by_email: 'NETO@NETO.com.br',
        id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
        name: 'NETO',
        email: 'NETO@NETO.com.br',
        owners: [
          {
            active: true,
            inactivation_date: null,
            created_at: '2021-12-24T05:52:11.739Z',
            updated_at: '2021-12-24T05:52:11.739Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: '22faf267-ac2a-4287-b64e-f01bd96d1362',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN01',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2021-12-24T05:52:21.059Z',
            updated_at: '2021-12-24T05:52:21.059Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: 'f3c2daa3-b201-458f-a70e-d06c41eb048d',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN02',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2022-01-07T21:50:44.016Z',
            updated_at: '2022-01-07T21:50:44.016Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: '89574777-5632-400b-b1cc-63850f0f1ca8',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN06',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2022-01-07T22:49:46.638Z',
            updated_at: '2022-01-07T22:49:46.638Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: 'd0290bf1-ebba-47bb-953d-ca1653d387b9',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN07',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2022-01-08T02:38:38.449Z',
            updated_at: '2022-01-08T02:38:38.449Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: '963fecff-f853-4fe2-878d-4c5dac6c2c48',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN07',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2022-01-08T02:38:39.905Z',
            updated_at: '2022-01-08T02:38:39.905Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: 'd3479a86-e0f2-4a6c-9c90-819684a447ab',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN07',
          },
          {
            active: true,
            inactivation_date: null,
            created_at: '2022-01-08T02:43:27.879Z',
            updated_at: '2022-01-08T02:43:27.879Z',
            created_by_name: 'NETO',
            created_by_email: 'NETO@NETO.com.br',
            updated_by_name: 'NETO',
            updated_by_email: 'NETO@NETO.com.br',
            id: 'e9a9a6ec-14bf-48b6-b596-65fa27500b40',
            user_id: 'a34df91e-60ac-4fde-9487-c4b9d33a835d',
            owner_name: 'Netão',
            code: 'DN09',
          },
        ],
      },
      inactivation_date,
      created_at: '2022-01-08T02:43:37.261Z',
      updated_at: '2022-01-08T02:43:37.261Z',
      id,
    } as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(createdOwner);

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await activeUseCase.execute(id, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe('This owner already active');
      expect(error.status).toBe(400);
      expect(error).toBeInstanceOf(BadRequestException);
      expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
      expect(saveSpy).not.toBeCalled();
    }
  });
});
