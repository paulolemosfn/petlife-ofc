import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { OwnersRepository } from '../../../repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../../getById/getById.owners.useCase';
import { ActivateOwnersController } from '../activate.owners.controller';
import { ActivateOwnersUseCase } from '../activate.owners.useCase';

describe('Suites Tests Activate Owners Controller', () => {
  let app: INestApplication;
  let activeUseCase: ActivateOwnersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ActivateOwnersController],
      providers: [
        ActivateOwnersUseCase,
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

    activeUseCase = moduleRef.get<ActivateOwnersUseCase>(ActivateOwnersUseCase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('POST /owners/activation/{id}', () => {
    const id = uuid();
    const user_id = uuid();

    const defaultHeaders: DefaultHeadersInterface = {
      user_id,
      username: 'Activate Test',
      useremail: 'activate@test.com',
    };

    it('Should activate a Owner', async () => {
      const activateUseCaseSpy = jest
        .spyOn(activeUseCase, 'execute')
        .mockResolvedValue(<any>'Service Contract activate');

      const result = await request(app.getHttpServer())
        .post(`/owners/activation/${id}`)
        .set(defaultHeaders)
        .expect(HttpStatus.NO_CONTENT);

      expect(result.body).toEqual({});
      expect(activateUseCaseSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
    });

    it('Bad Request - Invalid Id', async () => {
      const activateUseCaseSpy = jest.spyOn(activeUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .post(`/owners/activation/invalid-id`)
        .set({
          defaultHeaders,
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message[0]).toBe('id must be a UUID');
      expect(activateUseCaseSpy).not.toBeCalled();
    });
  });
});
