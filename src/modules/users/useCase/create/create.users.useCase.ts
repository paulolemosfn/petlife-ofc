import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../../repositories/users.repository';
import { CreateUsersDTO } from './create.users.dto';
import { buildUserCreate } from '../../builders/user-data.builders';
import { UsersEntity } from '../../entities/users.entity';

@Injectable()
export class CreateUsersUseCase {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repository: UsersRepository,
  ) {}

  public async execute(data: CreateUsersDTO): Promise<UsersEntity> {
    const { email } = data;
    const userExists = await this.repository.findOne({ where: { email } });

    if (userExists) {
      throw new BadRequestException(
        `The email ${email} has already been registered`,
      );
    }

    const createData = {
      ...data,
      email,
      created_by_name: data.name,
      created_by_email: email,
      updated_by_name: data.name,
      updated_by_email: email,
    };

    const userDataToCreate = buildUserCreate(createData);

    const result = await this.repository.save(userDataToCreate);

    return result;
  }
}
