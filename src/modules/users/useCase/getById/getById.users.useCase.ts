import { DefaultHeadersInterface } from './../../../../common/interfaces/default-headers.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../entities/users.entity';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class GetUsersByIdUseCase {
  constructor(
    @InjectRepository(UsersRepository)
    private repository: UsersRepository,
  ) {}

  public async execute(
    id: string,
    defaultHeaders: DefaultHeadersInterface,
  ): Promise<UsersEntity> {
    const userFound = await this.repository.findOne({
      where: { id },
    });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return userFound;
  }
}
