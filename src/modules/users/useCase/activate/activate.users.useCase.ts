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
import { buildActivationWithUser } from '../../../../common/builders/user-data-general.builders';
import { GetUsersByIdUseCase } from '../getById/getById.users.useCase';

@Injectable()
export class ActivateUsersUseCase {
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

    if (userFound.active === true) {
      throw new BadRequestException('This user already active');
    }

    const buildActivateUser = buildActivationWithUser(id, {
      user_id,
      ...userData,
    });

    return this.repository.save(buildActivateUser);
  }
}
