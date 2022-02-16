import { BaseRepository } from './../../../common/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { PetsEntity } from '../entities/pets.entity';

@EntityRepository(PetsEntity)
export class PetsRepository extends BaseRepository<PetsEntity> {}
