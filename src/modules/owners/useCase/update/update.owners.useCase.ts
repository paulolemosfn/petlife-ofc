import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { buildUpdateWithUser } from '../../../../common/builders/user-data-general.builders';
import { OwnersEntity } from '../../entities/owners.entity';
import { GetOwnerByIdUseCase } from '../getById/getById.owners.useCase';
import { DefaultHeadersInterface } from './../../../../common/interfaces/default-headers.interface';
import { OwnersRepository } from './../../repositories/owners.repository';
import { UpdateOwnersDTO } from './update.owners.dto';

@Injectable()
export class UpdateOwnersUseCase {
  constructor(
    @InjectRepository(OwnersRepository)
    private repository: OwnersRepository,

    @Inject(GetOwnerByIdUseCase)
    private getOwnerByIdUseCase: GetOwnerByIdUseCase,
  ) {}

  public async execute(
    id: string,
    updateOwnerData: UpdateOwnersDTO,
    defaultHeaders: DefaultHeadersInterface,
  ): Promise<OwnersEntity> {
    const foundOwner = await this.getOwnerByIdUseCase.execute(
      id,
      defaultHeaders,
    );

    const build = buildUpdateWithUser(
      { ...foundOwner, ...updateOwnerData },
      id,
      defaultHeaders,
    );

    const result = await this.repository.save(build);

    return result;
  }
}
