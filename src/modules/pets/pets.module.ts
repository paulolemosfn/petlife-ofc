import { UpdatePetsController } from './useCase/update/update.pets.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersRepository } from '../owners/repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../owners/useCase/getById/getById.owners.useCase';
import { UsersRepository } from '../users/repositories/users.repository';
import { GetUsersByIdUseCase } from '../users/useCase/getById/getById.users.useCase';
import { PetsRepository } from './repositories/pets.repository';
import { CreatePetsController } from './useCase/create/create.pets.controller';
import { CreatePetsUseCase } from './useCase/create/create.pets.useCase';
import { GetPetByIdController } from './useCase/getById/getById.pets.controller';
import { GetPetByIdUseCase } from './useCase/getById/getById.pets.useCase';
import { UpdatePetsUseCase } from './useCase/update/update.pets.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PetsRepository,
      OwnersRepository,
      UsersRepository,
    ]),
  ],
  providers: [
    CreatePetsUseCase,
    UpdatePetsUseCase,
    GetPetByIdUseCase,
    GetUsersByIdUseCase,
    GetOwnerByIdUseCase,
  ],
  exports: [CreatePetsUseCase, GetPetByIdUseCase, UpdatePetsUseCase],
  controllers: [
    CreatePetsController,
    GetPetByIdController,
    UpdatePetsController,
  ],
})
export class PetsModule {}
