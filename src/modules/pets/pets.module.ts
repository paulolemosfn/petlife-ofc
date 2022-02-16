import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersRepository } from '../owners/repositories/owners.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { PetsRepository } from './repositories/pets.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PetsRepository,
      OwnersRepository,
      UsersRepository,
    ]),
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export class PetsModule {}
