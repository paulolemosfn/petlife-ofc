import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { buildCreateWithUser } from '../../../../common/builders/user-data-general.builders';
import { generateAlphaNumeric } from '../../../../common/functions/alphanumeric';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { OwnersRepository } from '../../../owners/repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../../../owners/useCase/getById/getById.owners.useCase';
import { UsersRepository } from '../../../users/repositories/users.repository';
import { GetUsersByIdUseCase } from '../../../users/useCase/getById/getById.users.useCase';
import { PetsEntity } from './../../entities/pets.entity';
import { PetsRepository } from './../../repositories/pets.repository';
import { CreatePetsDTO } from './create.pets.dto';

@Injectable()
export class CreatePetsUseCase {
  constructor(
    @InjectRepository(PetsRepository)
    private repository: PetsRepository,

    @InjectRepository(OwnersRepository)
    private ownerRepository: OwnersRepository,

    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    @Inject(GetUsersByIdUseCase)
    private getUserById: GetUsersByIdUseCase,

    @Inject(GetOwnerByIdUseCase)
    private getOwnerById: GetOwnerByIdUseCase,
  ) {}

  public async execute(
    data: CreatePetsDTO,
    defaultHeaders: DefaultHeadersInterface,
  ): Promise<PetsEntity> {
    const { user_id } = defaultHeaders;

    const dataToCreate: Partial<PetsEntity> = data;

    const userFound = await this.getUserById.execute(user_id, defaultHeaders);

    dataToCreate.user = userFound;

    const ownerFound = await this.getOwnerById.execute(
      data.owner_id,
      defaultHeaders,
    );

    const petsQuantity = await this.repository.findAndCount(ownerFound.pets);

    const code = generateAlphaNumeric({
      initials: 'P',
      totalQuantity: petsQuantity[1],
      limit: 4,
    });

    dataToCreate.pet_code = code;

    const createData = {
      ...data,
      user_id,
    };

    const petDataToCreate = buildCreateWithUser(createData, defaultHeaders);

    const petCreated = await this.repository.save(petDataToCreate);

    return petCreated;
  }
}
