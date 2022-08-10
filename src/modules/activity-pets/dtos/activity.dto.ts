import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { BaseResponseDTO } from '../../../common/dtos/base.response.dto';
import { ACTIVITY } from '../utils/enums/activity';

export class ActivityDTO extends BaseResponseDTO {
  @ApiProperty({
    type: 'uuid',
    description: 'Id of the activity',
    example: 'fb5c9676-4e28-4daa-8efa-375512451f8f',
  })
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: 'uuid',
    description: 'Id of the pet',
    example: 'fb5c9676-4e28-4daa-8efa-375512451f8f',
  })
  @IsUUID('4')
  @IsNotEmpty()
  pet_id: string;

  @ApiProperty({
    type: 'uuid',
    description: 'Id of the owner',
    example: 'fb5c9676-4e28-4daa-8efa-375512451f8f',
  })
  @IsUUID('4')
  @IsNotEmpty()
  owner_id: string;

  @ApiProperty({
    type: 'string',
    description: 'Accomplished activity',
    enum: ACTIVITY,
  })
  @IsEnum(ACTIVITY, {
    message: `activity must be one of: ${ACTIVITY.join(', ')}`,
  })
  @IsString()
  @IsNotEmpty()
  activity: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Date of the activity',
    example: '2022-01-01',
  })
  @IsString()
  @IsOptional()
  activity_date?: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Name of the owner who did the activity ',
    example: 'Name',
  })
  @IsString()
  @IsOptional()
  created_by?: string;
}
