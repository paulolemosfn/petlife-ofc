import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { OwnersRepository } from '../owners.repository';
import { getDatabaseConfigConnectionQA } from '../../../../system/database/connection';
import { OwnersEntity } from '../../entities/owners.entity';
import { UsersEntity } from '../../../../modules/users/entities/users.entity';

describe('Suite test Owners Repository', () => {
  let ownersRepository: OwnersRepository;

  beforeAll(async () => {
    const databaseOptions = getDatabaseConfigConnectionQA();

    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...databaseOptions,
          entities: [OwnersEntity, UsersEntity],
        }),
        TypeOrmModule.forFeature([OwnersRepository]),
      ],
      providers: [OwnersRepository],
    }).compile();

    ownersRepository = moduleRef.get<OwnersRepository>(OwnersRepository);
  });

  afterEach(async () => {
    await getConnection().manager.clear(OwnersEntity);
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  const createOwner = {
    owner_name: 'Name',
    ownersQuantity: 5,
    created_at: '2021-12-20T18:25:10.415Z',
    created_by_name: 'create user name',
    created_by_email: 'create@teste.com.br',
    updated_at: '2021-12-20T18:25:10.416Z',
    updated_by_email: 'create@teste.com.br',
    updated_by_name: 'create user name',
    active: true,
    inactivation_date: '2021-12-20T18:25:10.416Z',
    id: 'fb5c9676-4e28-4daa-8efa-375512451f8f',
    code: 'DN06',
    user: {},
  };

  it('should find a owner by id', async () => {
    const user = await ownersRepository.save(createOwner);
    const result = await ownersRepository.findById(createOwner.id);

    expect(result.id).toEqual(user.id);
  });

  it('should find a owner by code', async () => {
    const findCode = await ownersRepository.save(createOwner);
    const result = await ownersRepository.findByCode(createOwner.code);

    expect(result.code).toEqual(findCode.code);
  });

  it('should find and count a owner by code', async () => {
    await ownersRepository.save(createOwner);
    const result = await ownersRepository.findAndCountByCode(createOwner.code);

    expect(result).toEqual(1);
  });
});
