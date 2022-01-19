import { UsersRepository } from './../../../users/repositories/users.repository';
import { OwnersEntity } from './../../entities/owners.entity';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersRepository } from '../../repositories/owners.repository';
import { CreateOwnersDTO } from './create.owners.dto';
import { generateAlphaNumeric } from '../../../../common/functions/alphanumeric';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { buildCreateWithUser } from '../../../../common/builders/user-data-general.builders';
import { GetUsersByIdUseCase } from '../../../../modules/users/useCase/getById/getById.users.useCase';

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
    const { ownersQuantity } = data;

    const dataToCreate: Partial<OwnersEntity> = data;

    const userFound = await this.getUserById.execute(user_id, defaultHeaders);

    dataToCreate.user = userFound;

    const code = generateAlphaNumeric({
      initials: 'DN',
      totalQuantity: ownersQuantity,
      limit: 4,
    });

    const ownersFound = await this.repository.findOne({
      where: { code: code },
    });

    if (ownersFound) {
      throw new ConflictException(`This code has already been registered`);
    }

    const createData = {
      ...data,
      user_id,
      code,
    };

    const ownerDataToCreate = buildCreateWithUser(createData, defaultHeaders);

    const ownerCreated = this.repository.save(ownerDataToCreate);

    return ownerCreated;
  }
}
