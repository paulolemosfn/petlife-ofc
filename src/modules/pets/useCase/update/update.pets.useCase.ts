import { PetsEntity } from './../../../pets/entities/pets.entity';
import { DefaultHeadersInterface } from 'src/common/interfaces/default-headers.interface';
import { GetPetByIdUseCase } from './../getById/getById.pets.useCase';
import { PetsRepository } from './../../repositories/pets.repository';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { buildUpdateWithUser } from '../../../../common/builders/user-data-general.builders';
import { UpdatePetsDTO } from './update.pets.dto';

@Injectable()
export class UpdatePetsUseCase {
  constructor(
    @InjectRepository(PetsRepository)
    private repository: PetsRepository,

    @Inject(GetPetByIdUseCase)
    private getPetById: GetPetByIdUseCase,
  ) {}

  public async execute(
    id: string,
    updatePetData: UpdatePetsDTO,
    defaultHeaders: DefaultHeadersInterface,
  ): Promise<PetsEntity> {
    const foundPet = await this.getPetById.execute(id, defaultHeaders);

    if (!foundPet.active) {
      throw new BadRequestException('You cannot update an inactive pet');
    }

    const build = buildUpdateWithUser(
      { ...foundPet, ...updatePetData },
      id,
      defaultHeaders,
    );

    const result = await this.repository.save(build);

    return result;
  }
}
