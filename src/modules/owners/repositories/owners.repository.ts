import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { OwnersEntity } from '../entities/owners.entity';
import { GetAllOwnersDTO } from '../useCase/getAll/getAll.owners.dto';

@EntityRepository(OwnersEntity)
export class OwnersRepository extends BaseRepository<OwnersEntity> {
  public async getOwnerByUserId(user_id: string): Promise<boolean> {
    const query = await this.createQueryBuilder('o')
      .select('*')
      .where(`o.user_id = '${user_id}'`)
      .getCount();

    return query >= 1 ? true : false;
  }

  private getFilterDynamic(options: GetAllOwnersDTO) {
    const query = this.createQueryBuilder('o').where(
      `o.user_id = '${options.user_id}'`,
    );

    if (options.owner_name) {
      query.andWhere(`o.owner_name ILIKE '%${options.owner_name}%'`);
    }

    if (options.size) {
      query.limit(+options.size);
    }

    if (options.showInactive) {
      if (options.showInactive === 'true') {
        query.andWhere(`o.active IN (true, false)`);
      } else if (options.showInactive === 'false') {
        query.andWhere(`o.active = true`);
      } else {
        query.andWhere('o.active = true');
      }
    }

    if (options.sortParam) {
      query.orderBy(
        `o.${options.sortParam}`,
        options.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
      );
    } else {
      query.orderBy(`o.created_at`, 'ASC');
    }

    return query;
  }

  public async getAll(
    options: GetAllOwnersDTO,
  ): Promise<{ data: OwnersEntity[]; count: number }> {
    const query = this.getFilterDynamic(options);

    const data = await query.getMany();

    return {
      count: data.length,
      data,
    };
  }
}
