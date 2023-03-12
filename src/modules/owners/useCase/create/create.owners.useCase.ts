import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { buildCreateWithUser } from '../../../../common/builders/user-data-general.builders';
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

    const userFound = await this.getUserById.execute(user_id, defaultHeaders);

    const ownerExists = await this.repository.getOwnerByUserId(user_id);

    if (ownerExists) {
      throw new BadRequestException(
        `There is already a pet owner registered for the user ${userFound.name}`,
      );
    }

    const ownerDataToCreate = buildCreateWithUser(
      {
        ...data,
        user_id,
      },
      defaultHeaders,
    );

    const ownerCreated = await this.repository.save(ownerDataToCreate);

    return ownerCreated;
  }
}
