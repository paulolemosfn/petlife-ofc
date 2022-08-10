import { BaseRepository } from '../../../common/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { ActivityEntity } from '../entities/activity.entity';

@EntityRepository(ActivityEntity)
export class ActivityRepository extends BaseRepository<ActivityEntity> {}
