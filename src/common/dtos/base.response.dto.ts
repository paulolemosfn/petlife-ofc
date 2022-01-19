import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseResponseDTO {
  @ApiProperty({
    type: 'string',
    example: new Date().toISOString(),
  })
  readonly created_at: Date;

  @ApiProperty({
    type: 'string',
    example: 'create user name',
  })
  readonly created_by_name: string;

  @ApiProperty({
    type: 'string',
    example: 'create@teste.com.br',
  })
  readonly created_by_email: string;

  @ApiProperty({
    type: 'string',
    example: new Date().toISOString(),
  })
  readonly updated_at: Date;

  @ApiProperty({
    type: 'string',
    example: 'update user name',
  })
  readonly updated_by_name: string;

  @ApiProperty({
    type: 'string',
    example: 'update@teste.com.br',
  })
  readonly updated_by_email: string;

  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  readonly active: boolean;

  @ApiPropertyOptional({
    type: 'string',
    example: new Date().toISOString(),
  })
  readonly inactivation_date: Date;

  constructor(data: BaseResponseDTO) {
    Object.assign(this, data);
  }
}
