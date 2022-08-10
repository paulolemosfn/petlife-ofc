import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { buildCreateWithUser } from '../../../../common/builders/user-data-general.builders';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { OwnersRepository } from '../../../owners/repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../../../owners/useCase/getById/getById.owners.useCase';
import { PetsRepository } from '../../../pets/repositories/pets.repository';
import { GetPetByIdUseCase } from '../../../pets/useCase/getById/getById.pets.useCase';
import { UsersRepository } from '../../../users/repositories/users.repository';
import { GetUsersByIdUseCase } from '../../../users/useCase/getById/getById.users.useCase';
import { ActivityEntity } from '../../entities/activity.entity';
import { ActivityRepository } from '../../repositories/activity.repository';
import { CreateActivityDTO } from './create.activity.dto';

@Injectable()
export class CreateActivityUseCase {
  constructor(
    @InjectRepository(ActivityRepository)
    private repository: ActivityRepository,

    @InjectRepository(PetsRepository)
    private petsRepository: PetsRepository,

    @InjectRepository(OwnersRepository)
    private ownerRepository: OwnersRepository,

    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    @Inject(GetUsersByIdUseCase)
    private getUserById: GetUsersByIdUseCase,

    @Inject(GetOwnerByIdUseCase)
    private getOwnerById: GetOwnerByIdUseCase,

    @Inject(GetPetByIdUseCase)
    private getPetById: GetPetByIdUseCase,
  ) {}

  public async execute(
    createActivity: CreateActivityDTO,
    defaultHeaders: DefaultHeadersInterface,
  ): Promise<ActivityEntity> {
    const { user_id } = defaultHeaders;

    const data: Partial<ActivityEntity> = createActivity;

    // const userFound = await this.getUserById.execute(user_id, defaultHeaders);

    const ownerFound = await this.getOwnerById.execute(
      data.owner_id,
      defaultHeaders,
    );

    const petFound = await this.getPetById.execute(data.pet_id, defaultHeaders);

    data.pets = petFound;

    if (!data.created_by) {
      data.created_by = ownerFound.owner_name;
    }

    if (!data.activity_date) {
      data.activity_date = format(new Date(), 'dd-MM-yyyy');
    }

    data.activity_hour = format(new Date(), 'HH:mm');

    const createData = {
      ...data,
      user_id,
    };

    const activityData = buildCreateWithUser(createData, defaultHeaders);

    const activityCreated = await this.repository.save(activityData);

    return activityCreated;
  }
}
