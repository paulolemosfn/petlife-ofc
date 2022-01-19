import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOwnersDTO {
  @ApiPropertyOptional({
    description: 'owner name',
    example: 'Name',
  })
  @IsString()
  @IsOptional()
  owner_name?: string;
}
