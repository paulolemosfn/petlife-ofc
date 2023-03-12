import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { GetAllPagedResponseInterface } from '../../../../common/interfaces/response/getAll.paged.response.interface';
import { OwnersEntity } from '../../entities/owners.entity';
import { OwnersRepository } from '../../repositories/owners.repository';
import { GetAllOwnersDTO } from './getAll.owners.dto';

@Injectable()
export class GetAllOwnersUseCase {
  constructor(
    @InjectRepository(OwnersRepository)
    private repository: OwnersRepository,
  ) {}

  public async execute(
    queryParams: GetAllOwnersDTO,
    defaultHeaders: DefaultHeadersInterface,
    showInactive: boolean,
  ): Promise<OwnersEntity[] | GetAllPagedResponseInterface<OwnersEntity>> {
    queryParams.user_id = defaultHeaders.user_id;

    const showInactiveString = <any>showInactive === true ? 'true' : 'false';

    return await this.repository.getAll({
      ...queryParams,
      showInactive: showInactiveString,
    });
  }
}
