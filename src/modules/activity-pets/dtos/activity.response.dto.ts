import { ApiProperty } from '@nestjs/swagger';
import { ActivityDTO } from './activity.dto';

export class ActivityResponseDTO extends ActivityDTO {
  @ApiProperty({
    type: 'string',
    description: 'Hour of the activity',
    example: '13:00h',
  })
  activity_hour: string;
}
