import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { buildInactivationWithUser } from '../../../../common/builders/user-data-general.builders';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { OwnersRepository } from '../../repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../getById/getById.owners.useCase';

@Injectable()
export class InactivateOwnersUseCase {
  constructor(
    @InjectRepository(OwnersRepository)
    private readonly repository: OwnersRepository,

    @Inject(GetOwnerByIdUseCase)
    private readonly getOwnersByIdUseCase: GetOwnerByIdUseCase,
  ) {}

  public async execute(
    id: string,
    { user_id, ...userData }: DefaultHeadersInterface,
  ): Promise<void> {
    await this.getOwnersByIdUseCase.execute(id, {
      user_id,
      ...userData,
    });

    const buildInactivateServiceContract = buildInactivationWithUser(id, {
      user_id,
      ...userData,
    });

    await this.repository.save(buildInactivateServiceContract);
  }
}
