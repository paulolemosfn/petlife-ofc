import { Repository } from 'typeorm';
import { IBaseRepository } from './interfaces/base.repository.interface';

export class BaseRepository<T>
  extends Repository<T>
  implements IBaseRepository<T>
{
  public async findById(id: string): Promise<T | undefined> {
    return this.findOne({ where: { id } });
  }
}
