import { GetPetByIdUseCase } from './../../getById/getById.pets.useCase';
import { PetsRepository } from './../../../repositories/pets.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdatePetsUseCase } from '../update.pets.useCase';
import { BadRequestException } from '@nestjs/common';

describe('Update Pet use case', () => {
  let updateUseCase: UpdatePetsUseCase;
  let repository: PetsRepository;
  let getByIdUseCase: GetPetByIdUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePetsUseCase,
        GetPetByIdUseCase,
        {
          provide: getRepositoryToken(PetsRepository),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    updateUseCase = module.get<UpdatePetsUseCase>(UpdatePetsUseCase);

    getByIdUseCase = module.get<GetPetByIdUseCase>(GetPetByIdUseCase);

    repository = await module.resolve<PetsRepository>(
      getRepositoryToken(PetsRepository),
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

  it('should be update a Pet', async () => {
    const id = uuid();

    const petData = {
      active: true,
      inactivation_date: null,
      created_at: '2022-02-17T06:30:18.047Z',
      updated_at: '2022-02-17T15:36:28.385Z',
      created_by_name: 'neto',
      created_by_email: 'neto@neto.com',
      updated_by_name: 'neto',
      updated_by_email: 'neto@neto.com',
      id,
      pet_name: 'Myke Douglas',
      user_id,
      pet_code: 'P003',
      breed: 'SRD',
      pet_type: 'Turtle',
      owner: [],
    } as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(petData);

    const updateBody = {
      pet_name: 'Cristiano Ronaldo',
    } as any;

    const expectedRes = {
      ...petData,
      ...updateBody,
      updated_by_name: defaultHeaders.username,
      updated_by_email: defaultHeaders.useremail,
    } as any;

    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(expectedRes);

    const result = await updateUseCase.execute(
      petData.id,
      updateBody,
      defaultHeaders,
    );

    expect(result).toEqual(expectedRes);
    expect(getByIdSpy).toHaveBeenNthCalledWith(1, petData.id, defaultHeaders);
    expect(saveSpy).toHaveBeenNthCalledWith(1, expectedRes);
  });

  it('Bad Request Exception - Cannot update a inactive Pet', async () => {
    expect.hasAssertions();

    const id = uuid();
    const inactivation_date = new Date();

    const petData = {
      active: false,
      inactivation_date,
      created_at: '2022-02-17T06:30:18.047Z',
      updated_at: '2022-02-17T15:36:28.385Z',
      created_by_name: 'neto',
      created_by_email: 'neto@neto.com',
      updated_by_name: 'neto',
      updated_by_email: 'neto@neto.com',
      id,
      pet_name: 'Myke Douglas',
      user_id,
      pet_code: 'P003',
      breed: 'SRD',
      pet_type: 'Turtle',
      owner: [],
    } as any;

    const getByIdSpy = jest
      .spyOn(getByIdUseCase, 'execute')
      .mockResolvedValue(petData);

    const updateBody = {
      Pet_name: 'Cristiano Ronaldo',
    } as any;

    const saveSpy = jest.spyOn(repository, 'save');

    try {
      await updateUseCase.execute(petData.id, updateBody, defaultHeaders);
    } catch (error) {
      expect(error.message).toBe('You cannot update an inactive pet');
      expect(error.status).toBe(400);
      expect(error).toBeInstanceOf(BadRequestException);
      expect(getByIdSpy).toHaveBeenNthCalledWith(1, id, defaultHeaders);
      expect(saveSpy).not.toBeCalled();
    }
  });
});
