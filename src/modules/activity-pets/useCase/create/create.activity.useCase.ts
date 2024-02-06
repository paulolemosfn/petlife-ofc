import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { buildCreateWithUser } from '../../../../common/builders/user-data-general.builders';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { GetOwnerByIdUseCase } from '../../../owners/useCase/getById/getById.owners.useCase';
import { GetPetByIdUseCase } from '../../../pets/useCase/getById/getById.pets.useCase';
import { ActivityEntity } from '../../entities/activity.entity';
import { ActivityRepository } from '../../repositories/activity.repository';
import { CreateActivityDTO } from './create.activity.dto';
import { formatDate } from '../../../../common/utils/date';

@Injectable()
export class CreateActivityUseCase {
  constructor(
    @InjectRepository(ActivityRepository)
    private repository: ActivityRepository,

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

    await this.getOwnerById.execute(data.owner_id, defaultHeaders);

    await this.getPetById.execute(data.pet_id, defaultHeaders);

    const createData = {
      ...data,
      user_id,
      activity_hour: format(new Date(), 'HH:mm'),
      activity_date: formatDate(new Date()),
      created_by: defaultHeaders.username,
    } as ActivityEntity;

    const activityData = buildCreateWithUser(createData, defaultHeaders);

    const activityCreated = await this.repository.save(activityData);

    return activityCreated;
  }
}
