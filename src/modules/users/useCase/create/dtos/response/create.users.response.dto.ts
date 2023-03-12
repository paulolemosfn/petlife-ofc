import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from '../../../../entities/users.entity';

export class CreateUsersResponseDTO {
  @ApiProperty({
    type: 'uuid',
    description: 'Id',
    example: '72154aae-1587-4e53-ac3f-f2dcbcffc85a',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Nome de quem criou',
    example: 'Name',
  })
  created_by_name: string;

  @ApiProperty({
    type: 'string',
    description: 'Email de quem criou',
    example: 'teste@teste.com',
  })
  created_by_email: string;

  @ApiProperty({
    type: 'string',
    description: 'Nome de quem editou',
    example: 'Name',
  })
  updated_by_name: string;

  @ApiProperty({
    type: 'string',
    description: 'Email de quem editou',
    example: 'teste@teste.com',
  })
  updated_by_email: string;

  @ApiProperty({
    type: 'date',
    description: 'Data de criação',
    example: '72154aae-1587-4e53-ac3f-f2dcbcffc85a',
  })
  created_at: Date;

  @ApiProperty({
    type: 'date',
    description: 'Data de edição',
    example: '72154aae-1587-4e53-ac3f-f2dcbcffc85a',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'name',
    example: 'Name',
  })
  name: string;

  @ApiProperty({
    description: 'email',
    example: 'test@petlife.com',
  })
  email: string;

  constructor(data: Partial<UsersEntity>) {
    this.id = data.id;
    this.created_by_email = data.created_by_email;
    this.created_by_name = data.created_by_name;
    this.updated_by_email = data.updated_by_email;
    this.updated_by_name = data.updated_by_name;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.name = data.name;
    this.email = data.email;
  }
}
