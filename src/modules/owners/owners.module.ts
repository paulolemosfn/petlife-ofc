import { UsersRepository } from './../users/repositories/users.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateOwnersUseCase } from './useCase/update/update.owners.useCase';
import { UpdateOwnersController } from './useCase/update/update.owners.controller';
import { OwnersRepository } from './repositories/owners.repository';
import { CreateOwnersUseCase } from './useCase/create/create.owners.useCase';
import { CreateOwnersController } from './useCase/create/create.owners.controller';
import { GetOwnerByIdController } from './useCase/getById/getById.owners.controller';
import { GetOwnerByIdUseCase } from './useCase/getById/getById.owners.useCase';
import { GetAllOwnersController } from './useCase/getAll/getAll.owners.controller';
import { GetAllOwnersUseCase } from './useCase/getAll/getAll.owners.useCase';
import { GetUsersByIdUseCase } from '../users/useCase/getById/getById.users.useCase';
import { ActivateOwnersUseCase } from './useCase/activate/activate.owners.useCase';
import { ActivateOwnersController } from './useCase/activate/activate.owners.controller';
import { InactivateOwnersUseCase } from './useCase/inactivate/inactivate.owners.useCase';
import { InactivateOwnersController } from './useCase/inactivate/inactivate.owners.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OwnersRepository, UsersRepository])],
  providers: [
    CreateOwnersUseCase,
    GetOwnerByIdUseCase,
    GetAllOwnersUseCase,
    GetUsersByIdUseCase,
    UpdateOwnersUseCase,
    InactivateOwnersUseCase,
    ActivateOwnersUseCase,
  ],
  exports: [
    CreateOwnersUseCase,
    GetOwnerByIdUseCase,
    GetAllOwnersUseCase,
    UpdateOwnersUseCase,
    InactivateOwnersUseCase,
    ActivateOwnersUseCase,
  ],
  controllers: [
    CreateOwnersController,
    GetOwnerByIdController,
    GetAllOwnersController,
    UpdateOwnersController,
    InactivateOwnersController,
    ActivateOwnersController,
  ],
})
export class OwnersModule {}
