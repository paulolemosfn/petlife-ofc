import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindAllQueryDto {
  public static getPropertyNames() {
    return [
      'page',
      'size',
      'withPagination',
      'sortParam',
      'sortOrder',
      'showInactive',
    ];
  }

  @ApiPropertyOptional({
    description: 'Records page',
    type: Number,
  })
  @IsOptional()
  page?: string;

  @ApiPropertyOptional({
    description: 'Items per page',
    type: Number,
  })
  @IsOptional()
  size?: string;

  @ApiPropertyOptional({
    description: 'Paginate the results',
    type: String,
  })
  @IsString()
  @IsOptional()
  withPagination?: string;

  @ApiPropertyOptional({
    description: 'Sort Param',
    type: String,
  })
  @IsString()
  @IsOptional()
  sortParam?: string;

  @ApiPropertyOptional({
    description: 'Sort Order',
    type: String,
  })
  @IsString()
  @IsOptional()
  sortOrder?: string;

  @ApiPropertyOptional({
    description: 'Show inactive records',
    type: String,
  })
  @IsString()
  @IsOptional()
  showInactive?: string;
}
