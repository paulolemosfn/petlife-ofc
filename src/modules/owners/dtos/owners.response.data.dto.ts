import { ApiProperty } from '@nestjs/swagger';
import { OwnersResponseDTO } from './owners.response.dto';

export class OwnersResponseDataDTO {
  @ApiProperty()
  data: OwnersResponseDTO;

  constructor(data: OwnersResponseDTO) {
    this.data = data;
  }
}
