import { OmitType } from '@nestjs/swagger';
import { PetsDTO } from '../../dtos/pets.dto';

export class CreatePetsDTO extends OmitType(PetsDTO, [
  'id',
  'created_at',
  'updated_at',
  'created_by_name',
  'created_by_email',
  'updated_by_name',
  'updated_by_email',
  'inactivation_date',
  'active',
]) {}
