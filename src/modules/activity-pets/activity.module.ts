import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersRepository } from '../owners/repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../owners/useCase/getById/getById.owners.useCase';
import { PetsRepository } from '../pets/repositories/pets.repository';
import { GetPetByIdUseCase } from '../pets/useCase/getById/getById.pets.useCase';
import { UsersRepository } from '../users/repositories/users.repository';
import { GetUsersByIdUseCase } from '../users/useCase/getById/getById.users.useCase';
import { ActivityRepository } from './repositories/activity.repository';
import { CreateActivityController } from './useCase/create/create.activity.controller';
import { CreateActivityUseCase } from './useCase/create/create.activity.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityRepository,
      OwnersRepository,
      UsersRepository,
      PetsRepository,
    ]),
  ],
  providers: [
    CreateActivityUseCase,
    GetUsersByIdUseCase,
    GetOwnerByIdUseCase,
    GetPetByIdUseCase,
  ],
  exports: [CreateActivityUseCase],
  controllers: [CreateActivityController],
})
export class ActivityModule {}
