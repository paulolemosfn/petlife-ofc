import { buildUpdateWithUser } from '../../../../common/builders/user-data-general.builders';
import { GetUsersByIdUseCase } from './../getById/getById.users.useCase';
import { UsersRepository } from './../../repositories/users.repository';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUsersDTO } from './update.users.dto';
import { UsersEntity } from '../../entities/users.entity';

@Injectable()
export class UpdateUsersUseCase {
  constructor(
    @InjectRepository(UsersRepository)
    private repository: UsersRepository,

    @Inject(GetUsersByIdUseCase)
    private getUsersByIdUseCase: GetUsersByIdUseCase,
  ) {}

  public async execute(
    id: string,
    updateUsersData: UpdateUsersDTO,
    defaultHeaders: DefaultHeadersInterface,
  ): Promise<UsersEntity> {
    const data: Partial<UsersEntity> = updateUsersData;

    const { email } = data;

    const foundUser = await this.getUsersByIdUseCase.execute(
      id,
      defaultHeaders,
    );

    if (foundUser.active === false) {
      throw new BadRequestException(`You cannot update an inactive user`);
    }

    if (data.password) {
      if (!data.name || !email)
        throw new BadRequestException(
          `You needed send the new password, name and email!`,
        );
    }

    const foundEmail = await this.repository.findByEmail(email);

    if (foundEmail) {
      throw new BadRequestException(
        `The user with the email: ${data.email} already exists`,
      );
    }

    const createData = {
      ...data,
      email,
    };

    const build = buildUpdateWithUser(createData, id, defaultHeaders);

    const result = await this.repository.save(build);

    return result;
  }
}
