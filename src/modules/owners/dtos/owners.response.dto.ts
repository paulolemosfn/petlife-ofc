import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDTO } from '../../../common/dtos/base.response.dto';

export class OwnersResponseDTO extends BaseResponseDTO {
  @ApiProperty({
    type: 'uuid',
    example: 'fb5c9676-4e28-4daa-8efa-375512451f8f',
  })
  readonly id: string;

  @ApiProperty({
    type: 'string',
    example: 'owner name',
  })
  readonly owner_name: string;

  @ApiProperty({
    type: 'string',
    example: 'DN01',
  })
  readonly code: string;
}
