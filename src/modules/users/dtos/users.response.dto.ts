import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDTO } from '../../../common/dtos/base.response.dto';

export class UsersResponseDTO extends BaseResponseDTO {
  @ApiProperty({
    type: 'uuid',
    example: 'fb5c9676-4e28-4daa-8efa-375512451f8f',
  })
  readonly id: string;

  @ApiProperty({
    type: 'string',
    example: 'name',
  })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: 'test@petlife.com',
  })
  readonly email: string;
}
