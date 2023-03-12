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
import { MockBuilderOwner } from '../../../utils/builders/owners.builder';

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
      const ownerData = new MockBuilderOwner().buildAll() as any;

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

      expect(result.body.message).toEqual(
        expect.arrayContaining(['id must be a UUID']),
      );
      expect(updateUseCaseSpy).not.toBeCalled();
    });
  });
});
