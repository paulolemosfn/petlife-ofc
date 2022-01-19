import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DefaultHeadersInterface } from '../../../../../common/interfaces/default-headers.interface';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
import { OwnersRepository } from '../../../repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../../getById/getById.owners.useCase';
import { InactivateOwnersController } from '../inactivate.owners.controller';
import { InactivateOwnersUseCase } from '../inactivate.owners.useCase';

describe('Suites Tests Inactivate Owners Controller', () => {
  let app: INestApplication;
  let activeUseCase: InactivateOwnersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [InactivateOwnersController],
      providers: [
        InactivateOwnersUseCase,
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

    activeUseCase = moduleRef.get<InactivateOwnersUseCase>(
      InactivateOwnersUseCase,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('POST /owners/inactivation/{id}', () => {
    const id = uuid();
    const user_id = uuid();

    const defaultHeaders: DefaultHeadersInterface = {
      user_id,
      username: 'inactivate Test',
      useremail: 'inactivate@test.com',
    };

    it('Should inactivate a Owner', async () => {
      const inactivateUseCaseSpy = jest
        .spyOn(activeUseCase, 'execute')
        .mockResolvedValue(<any>'owners inactivate');

      const result = await request(app.getHttpServer())
        .post(`/owners/inactivation/${id}`)
        .set(defaultHeaders)
        .expect(HttpStatus.NO_CONTENT);

      expect(result.body).toEqual({});
      expect(inactivateUseCaseSpy).toHaveBeenNthCalledWith(
        1,
        id,
        defaultHeaders,
      );
    });

    it('Bad Request - Invalid Id', async () => {
      const inactivateUseCaseSpy = jest.spyOn(activeUseCase, 'execute');

      const result = await request(app.getHttpServer())
        .post(`/owners/inactivation/invalid-id`)
        .set({
          defaultHeaders,
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body.message[0]).toBe('id must be a UUID');
      expect(inactivateUseCaseSpy).not.toBeCalled();
    });
  });
});
