import { OwnersEntity } from '../entities/owners.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';

@EntityRepository(OwnersEntity)
export class OwnersRepository extends BaseRepository<OwnersEntity> {
  public async findByCode(code: string): Promise<OwnersEntity | undefined> {
    return this.findOne({ where: { code } });
  }
  public async findAndCountByCode(code: any): Promise<number> {
    return this.count({ where: { code } });
  }
}
