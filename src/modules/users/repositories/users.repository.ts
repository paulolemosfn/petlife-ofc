import { UsersEntity } from '../entities/users.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';

@EntityRepository(UsersEntity)
export class UsersRepository extends BaseRepository<UsersEntity> {
  public async findByEmail(email: string): Promise<UsersEntity | undefined> {
    return this.findOne({ where: { email } });
  }
  public async findAndCountByCode(code: any): Promise<number> {
    return this.count({ where: { code } });
  }
}
