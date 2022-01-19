import { UsersEntity } from './../../entities/users.entity';
import { DefaultHeadersInterface } from './../../../../common/interfaces/default-headers.interface';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../../repositories/users.repository';
import { GetUsersByIdUseCase } from '../getById/getById.users.useCase';
import { buildInactivationWithUser } from '../../../../common/builders/user-data-general.builders';

@Injectable()
export class InactivateUsersUseCase {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repository: UsersRepository,

    @Inject(GetUsersByIdUseCase)
    private readonly getUsersByIdUseCase: GetUsersByIdUseCase,
  ) {}

  public async execute(
    id: string,
    { user_id, ...userData }: DefaultHeadersInterface,
  ): Promise<UsersEntity> {
    const userFound = await this.getUsersByIdUseCase.execute(id, {
      user_id,
      ...userData,
    });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    if (userFound.inactivation_date !== null) {
      throw new BadRequestException('This user is already inactive');
    }

    const buildInactivationUser = buildInactivationWithUser(id, {
      user_id,
      ...userData,
    });

    return this.repository.save(buildInactivationUser);
  }
}
