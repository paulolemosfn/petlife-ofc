import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { OwnersRepository } from '../../repositories/owners.repository';
import { OwnersEntity } from '../../entities/owners.entity';
import { RequestGetAllInterface } from '../../../../common/interfaces/interfaces';
import { GetAllPagedResponseInterface } from '../../../../common/interfaces/response/getAll.paged.response.interface';
import {
  formatParamsToTypeOrmOptionsWithPaginate,
  formatPaginateDataToResponse,
  formatParamsToTypeOrmOptionsWithoutPaginate,
} from '../../../../common/lib';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetAllOwnersUseCase {
  // private OwnersRepository: OwnersRepository;
  private readonly repository: Repository<OwnersEntity>;

  constructor(
    @InjectRepository(OwnersRepository)
    repository: Repository<OwnersEntity>,
    // private OwnersRepository: OwnersRepository,
  ) {
    // super(OwnersRepository);
    // this.OwnersRepository = OwnersRepository;
    this.repository = repository;
  }

  public async execute(
    queryParams: RequestGetAllInterface,
  ): Promise<OwnersEntity[]> {
    return this.repository.find();
  }

  // public async execute(
  //   queryParams: RequestGetAllInterface,
  // ): Promise<[OwnersEntity[], number]> {
  //   return this.repository.findAndCount();
  // }

  //   queryParams: RequestGetAllInterface,
  //   withPagination: boolean,
  //   showInactive: boolean
  // ): Promise<OwnersEntity[] | GetAllPagedResponseInterface<OwnersEntity>> {
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
