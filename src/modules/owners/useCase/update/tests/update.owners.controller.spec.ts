import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { OwnersRepository } from '../../../repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../../getById/getById.owners.useCase';
import { UpdateOwnersController } from '../update.owners.controller';
import { UpdateOwnersUseCase } from '../update.owners.useCase';

describe('Suites Tests Update Owner Controller', () => {
  let app: INestApplication;
  let updateUseCase: UpdateOwnersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UpdateOwnersController],
      providers: [
        UpdateOwnersUseCase,
        GetOwnerByIdUseCase,
        {
          provide: getRepositoryToken(OwnersRepository),
          useValue: {},
        },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    updateUseCase = moduleRef.get<UpdateOwnersUseCase>(UpdateOwnersUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('PUT /owners/{id}', () => {
    const id = uuid();
    const user_id = uuid();

    const defaultHeaders: DefaultHeadersInterface = {
      user_id,
      username: 'update Test',
      useremail: 'update@test.com',
    };

    it('Should update a Owner', async () => {
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

      const mockUseCaseRes = {
        ...ownerData,
        user_id,
      } as any;

      const updateBody = {
        owner_name: 'Cristiano Ronaldo',
      } as any;

      const updateUseCaseSpy = jest
        .spyOn(updateUseCase, 'execute')
        .mockResolvedValue({ ...mockUseCaseRes, ...updateBody });

      const result = await request(app.getHttpServer())
        .put(`/owners/${id}`)
        .set(defaultHeaders)
        .send(updateBody)
        .expect(HttpStatus.OK);

      expect(result.body).toEqual({ ...mockUseCaseRes, ...updateBody });
      expect(updateUseCaseSpy).toHaveBeenNthCalledWith(
        1,
        id,
        updateBody,
        defaultHeaders,
      );
    });

    it('Bad Request - Invalid Id', async () => {
      const updateUseCaseSpy = jest.spyOn(updateUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .put(`/owners/invalid-id`)
        .set({
          defaultHeaders,
        })
        .send()
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message[0]).toBe('id must be a UUID');
      expect(updateUseCaseSpy).not.toBeCalled();
    });
  });
});
