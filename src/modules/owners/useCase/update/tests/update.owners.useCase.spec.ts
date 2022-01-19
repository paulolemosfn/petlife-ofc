import { GetOwnerByIdUseCase } from './../../getById/getById.owners.useCase';
import { OwnersRepository } from './../../../repositories/owners.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateOwnersUseCase } from '../update.owners.useCase';
import { BadRequestException } from '@nestjs/common';
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
    const id = uuid();

    const ownerData = {
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
      inactivation_date: null,
      created_at: '2022-01-08T02:43:37.261Z',
      updated_at: '2022-01-08T02:43:37.261Z',
      id,
    } as any;

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

  it('Bad Request Exception - Cannot update a inactive owner', async () => {
    expect.hasAssertions();

    const id = uuid();
    const inactivation_date = new Date();

    const ownerData = {
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
      .mockResolvedValue(ownerData);

    const updateBody = {
      owner_name: 'Cristiano Ronaldo',
    } as any;

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await updateUseCase.execute(ownerData.id, updateBody, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe('You cannot update an inactive owner');
      expect(error.status).toBe(400);
      expect(error).toBeInstanceOf(BadRequestException);
      expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
      expect(saveSpy).not.toBeCalled();
    }
  });
});
