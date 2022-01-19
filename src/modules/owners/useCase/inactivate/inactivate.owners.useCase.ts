import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersEntity } from '../../entities/owners.entity';
import { OwnersRepository } from '../../repositories/owners.repository';
import { GetOwnerByIdUseCase } from '../getById/getById.owners.useCase';
import { buildInactivationWithUser } from '../../../../common/builders/user-data-general.builders';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';

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
  ): Promise<OwnersEntity> {
    const foundOwner = await this.getOwnersByIdUseCase.execute(id, {
      user_id,
      ...userData,
    });

    if (!foundOwner) {
      throw new NotFoundException('Owner not found');
    }

    if (foundOwner.active === false) {
      throw new BadRequestException('This owner already inactive');
    }

    const buildInactivateServiceContract = buildInactivationWithUser(id, {
      user_id,
      ...userData,
    });

    return this.repository.save(buildInactivateServiceContract);
  }
}
