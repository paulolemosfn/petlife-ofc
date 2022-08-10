import { ApiProperty } from '@nestjs/swagger';
import { PetsDTO } from './pets.dto';

export class PetsResponseDTO extends PetsDTO {
  @ApiProperty({
    type: 'string',
    description: 'Pet Code',
    example: 'P01',
  })
  pet_code: string;

  @ApiProperty({
    type: 'string',
    description: 'Hour of the activity',
    example: '13:00h',
  })
  activity_hour: string;
}
