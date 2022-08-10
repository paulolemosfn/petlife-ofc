import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetsEntity } from '../../entities/pets.entity';
import { PetsRepository } from '../../repositories/pets.repository';

@Injectable()
export class GetPetByIdUseCase {
  constructor(
    @InjectRepository(PetsRepository)
    private repository: PetsRepository,
  ) {}

  public async execute(
    id: string,
    { user_id, ...userData }: DefaultHeadersInterface,
  ): Promise<PetsEntity> {
    const PetFound = await this.repository.findOne({
      where: { id, user_id },
    });

    if (!PetFound) {
      throw new NotFoundException('Pet not found');
    }

    return PetFound;
  }
}
