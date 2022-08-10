import { OmitType } from '@nestjs/swagger';
import { ActivityDTO } from '../../dtos/activity.dto';

export class CreateActivityDTO extends OmitType(ActivityDTO, [
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
