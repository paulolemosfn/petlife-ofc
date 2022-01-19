import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOwnersDTO {
  @ApiProperty({
    description: 'name',
    example: 'Name',
  })
  @IsNotEmpty()
  @IsString()
  owner_name: string;

  @ApiProperty({
    description: 'Quantity of owners',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  ownersQuantity: number;
}
