import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersEntity } from '../../entities/users.entity';
import { RequestGetAllInterface } from '../../../../common/interfaces/interfaces';
import { GetAllPagedResponseInterface } from '../../../../common/interfaces/response/getAll.paged.response.interface';
import {
  formatParamsToTypeOrmOptionsWithPaginate,
  formatPaginateDataToResponse,
  formatParamsToTypeOrmOptionsWithoutPaginate,
} from '../../../../common/lib';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetAllUsersUseCase {
  // private usersRepository: UsersRepository;
  private readonly repository: Repository<UsersEntity>;

  constructor(
    @InjectRepository(UsersRepository)
    repository: Repository<UsersEntity>,
    // private usersRepository: UsersRepository,
  ) {
    // super(usersRepository);
    // this.usersRepository = usersRepository;
    this.repository = repository;
  }

  public async execute(
    queryParams: RequestGetAllInterface,
  ): Promise<UsersEntity[]> {
    return this.repository.find();
  }

  // public async execute(
  //   queryParams: RequestGetAllInterface,
  // ): Promise<[UsersEntity[], number]> {
  //   return this.repository.findAndCount();
  // }

  //   queryParams: RequestGetAllInterface,
  //   withPagination: boolean,
  //   showInactive: boolean
  // ): Promise<UsersEntity[] | GetAllPagedResponseInterface<UsersEntity>> {
  //   if (withPagination) {
  //     const options = formatParamsToTypeOrmOptionsWithPaginate(
  //       queryParams,
  //       showInactive,
  //     );

  //     const [data, count] = await this.repository.findAndCount(options);

  //     return formatPaginateDataToResponse(queryParams, {
  //       data,
  //       count,
  //     });
  //   }

  //   const options = formatParamsToTypeOrmOptionsWithoutPaginate(
  //     queryParams,
  //     showInactive,
  //   );

  //   return this.repository.find(options);
  // }
}
