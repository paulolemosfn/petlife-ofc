import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword as cryptoPassword } from '../../../../common/functions/bcrypt';
import { buildUserCreate } from '../../builders/user-data.builders';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersEntity } from './../../entities/users.entity';
import { CreateUsersRequestDTO } from './dtos/request/create.users.request.dto';

@Injectable()
export class CreateUsersUseCase {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repository: UsersRepository,
  ) {}

  public async execute(data: CreateUsersRequestDTO): Promise<UsersEntity> {
    const userExists = await this.repository.findOne({
      where: { email: data.email },
    });

    if (userExists) {
      throw new BadRequestException(
        `The email ${data.email} has already been registered for other user`,
      );
    }

    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Use the same passwords');
    }

    const password = cryptoPassword(data.password);

    const createData = {
      ...data,
      password,
      created_by_name: data.name,
      created_by_email: data.email,
      updated_by_name: data.name,
      updated_by_email: data.email,
    };

    delete createData.confirmPassword;

    const userDataToCreate = buildUserCreate(createData);

    const result = await this.repository.save(userDataToCreate);

    return result;
  }
}
