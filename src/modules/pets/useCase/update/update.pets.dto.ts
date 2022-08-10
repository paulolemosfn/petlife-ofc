import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePetsDTO {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Pet Name',
    example: 'Myke',
  })
  pet_name?: string;

  @ApiPropertyOptional({
    type: 'uuid',
    description: 'Id of the owner',
    example: 'fb5c9676-4e28-4daa-8efa-375512451f8f',
  })
  owner_id?: string;

  @ApiPropertyOptional({
    type: 'string',
    description: `Pet's Breed`,
    example: 'Golden',
  })
  breed?: string;

  @ApiPropertyOptional({
    type: 'string',
    description: `Pet's Type`,
    example: 'Dog',
  })
  pet_type?: string;
}
