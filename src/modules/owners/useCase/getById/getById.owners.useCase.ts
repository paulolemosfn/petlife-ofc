import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersEntity } from '../../entities/owners.entity';
import { OwnersRepository } from '../../repositories/owners.repository';

@Injectable()
export class GetOwnerByIdUseCase {
  constructor(
    @InjectRepository(OwnersRepository)
    private repository: OwnersRepository,
  ) {}

  public async execute(
    id: string,
    defaultHeaders: DefaultHeadersInterface,
  ): Promise<OwnersEntity> {
    const { user_id } = defaultHeaders;

    const ownerFound = await this.repository.findOne({
      where: { id, user_id, active: true },
    });

    if (!ownerFound) {
      throw new NotFoundException('Owner not found');
    }

    return ownerFound;
  }
}
