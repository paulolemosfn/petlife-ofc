import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseResponseDTO } from './../../../common/dtos/base.response.dto';

export class PetsDTO extends BaseResponseDTO {
  @ApiProperty({
    type: 'uuid',
    description: 'Id of the pet',
    example: 'fb5c9676-4e28-4daa-8efa-375512451f8f',
  })
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Pet Name',
    example: 'Myke',
  })
  @IsString()
  @IsNotEmpty()
  pet_name: string;

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
    description: `Pet's Breed`,
    example: 'Golden',
  })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @ApiProperty({
    type: 'string',
    description: `Pet's Type`,
    example: 'Dog',
  })
  @IsString()
  @IsNotEmpty()
  pet_type: string;
}
