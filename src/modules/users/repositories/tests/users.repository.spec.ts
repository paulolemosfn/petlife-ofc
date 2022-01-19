import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { UsersRepository } from '../users.repository';
import { getDatabaseConfigConnectionQA } from '../../../../system/database/connection';
import { UsersEntity } from '../../entities/users.entity';
import { OwnersEntity } from '../../../../modules/owners/entities/owners.entity';

describe('Suite test Users Repository', () => {
  let userRepository: UsersRepository;

  beforeAll(async () => {
    const databaseOptions = getDatabaseConfigConnectionQA();

    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...databaseOptions,
          entities: [UsersEntity, OwnersEntity],
        }),
        TypeOrmModule.forFeature([UsersRepository]),
      ],
      providers: [UsersRepository],
    }).compile();

    userRepository = moduleRef.get<UsersRepository>(UsersRepository);
  });

  const buildUsers = {
    name: 'NETO',
    email: '4NETO@NETO.com.br',
    password: '%?luZkP1JN7j',
  };

  const expectedRes = {
    ...buildUsers,
    created_by_name: buildUsers.name,
    created_by_email: buildUsers.email,
    updated_by_name: buildUsers.name,
    updated_by_email: buildUsers.email,
    active: true,
  } as any;

  afterEach(async () => {
    await getConnection().manager.clear(UsersEntity);
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('should find a user by id', async () => {
    const user = await userRepository.save(expectedRes);
    const result = await userRepository.findById(expectedRes.id);

    expect(result.id).toEqual(user.id);
  });

  it('should find a user by email', async () => {
    const findEmail = await userRepository.save(expectedRes);
    const result = await userRepository.findByEmail(expectedRes.email);

    expect(result.email).toEqual(findEmail.email);
  });
});
