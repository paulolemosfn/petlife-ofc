import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { FindAllQueryDto } from '../../../../common/dtos/findall-query.dto';

export class GetAllOwnersDTO extends PartialType(FindAllQueryDto) {
  @ApiPropertyOptional({
    type: 'string',
    example: 'owner name',
  })
  @IsString()
  @IsOptional()
  owner_name: string;

  @ApiPropertyOptional({
    type: 'uuid',
    example: 'fb5c9676-4e28-4daa-8efa-375512451f8f',
  })
  @IsUUID()
  @IsOptional()
  user_id: string;
}
