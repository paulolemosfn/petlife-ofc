import { OwnersRepository } from './../owners/repositories/owners.repository';
import { InactivateUsersUseCase } from './useCase/inactivate/inactivate.users.useCase';
import { UpdateUsersUseCase } from './useCase/update/update.users.useCase';
import { UpdateUsersController } from './useCase/update/update.users.controller';
import { UsersRepository } from './repositories/users.repository';
import { CreateUsersUseCase } from './useCase/create/create.users.useCase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUsersController } from './useCase/create/create.users.controller';
import { GetUsersByIdUseCase } from './useCase/getById/getById.users.useCase';
import { GetUsersByIdController } from './useCase/getById/getById.users.controller';
import { GetAllUsersController } from './useCase/getAll/getAll.users.controller';
import { GetAllUsersUseCase } from './useCase/getAll/getAll.users.useCase';
import { ActivateUsersUseCase } from './useCase/activate/activate.users.useCase';
import { ActivateUsersController } from './useCase/activate/activate.users.controller';
import { InactivateUsersController } from './useCase/inactivate/inactivate.users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, OwnersRepository])],
  providers: [
    CreateUsersUseCase,
    GetUsersByIdUseCase,
    GetAllUsersUseCase,
    UpdateUsersUseCase,
    InactivateUsersUseCase,
    ActivateUsersUseCase,
  ],
  exports: [
    CreateUsersUseCase,
    GetUsersByIdUseCase,
    GetAllUsersUseCase,
    UpdateUsersUseCase,
    InactivateUsersUseCase,
    ActivateUsersUseCase,
  ],
  controllers: [
    CreateUsersController,
    GetUsersByIdController,
    GetAllUsersController,
    UpdateUsersController,
    InactivateUsersController,
    ActivateUsersController,
  ],
})
export class UsersModule {}
