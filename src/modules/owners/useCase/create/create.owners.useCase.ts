import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { buildCreateWithUser } from '../../../../common/builders/user-data-general.builders';
import { generateAlphaNumeric } from '../../../../common/functions/alphanumeric';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { GetUsersByIdUseCase } from '../../../../modules/users/useCase/getById/getById.users.useCase';
import { OwnersRepository } from '../../repositories/owners.repository';
import { UsersRepository } from './../../../users/repositories/users.repository';
import { OwnersEntity } from './../../entities/owners.entity';
import { CreateOwnersDTO } from './create.owners.dto';

@Injectable()
export class CreateOwnersUseCase {
  constructor(
    @InjectRepository(OwnersRepository)
    private repository: OwnersRepository,

    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,

    @Inject(GetUsersByIdUseCase)
    private getUserById: GetUsersByIdUseCase,
  ) {}

  public async execute(
    data: CreateOwnersDTO,
    defaultHeaders: DefaultHeadersInterface,
  ): Promise<OwnersEntity> {
    const { user_id } = defaultHeaders;

    const dataToCreate: Partial<OwnersEntity> = data;

    const userFound = await this.getUserById.execute(user_id, defaultHeaders);

    dataToCreate.user = userFound;

    const ownersCount = await this.repository.count(userFound.owners as any);

    // const [owners, count] = ownersCount;

    const code = generateAlphaNumeric({
      initials: 'DN',
      totalQuantity: ownersCount,
      limit: 4,
    });

    const createData = {
      ...data,
      user_id,
      code,
    };

    const ownerDataToCreate = buildCreateWithUser(createData, defaultHeaders);

    const ownerCreated = await this.repository.save(ownerDataToCreate);

    return ownerCreated;
  }
}
