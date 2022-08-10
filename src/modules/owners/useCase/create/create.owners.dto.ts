import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOwnersDTO {
  @ApiProperty({
    description: 'name',
    example: 'Name',
  })
  @IsNotEmpty()
  @IsString()
  owner_name: string;
}
