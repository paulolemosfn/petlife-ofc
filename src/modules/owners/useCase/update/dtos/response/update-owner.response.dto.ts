import { ApiProperty } from '@nestjs/swagger';
import { OwnersEntity } from '../../../../entities/owners.entity';

export class UpdateOwnerResponseDTO {
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
    type: 'uuid',
    description: 'Id do usuario',
    example: '72154aae-1587-4e53-ac3f-f2dcbcffc85a',
  })
  user_id: string;

  @ApiProperty({
    type: 'string',
    description: 'Nome do dono do Pet',
    example: 'Nome',
  })
  owner_name: string;

  @ApiProperty({
    type: 'uuid',
    description: 'Id do pet registrado para esse dono',
    example: '72154aae-1587-4e53-ac3f-f2dcbcffc85a',
  })
  pet_id: string;

  constructor(data: OwnersEntity) {
    this.id = data.id;
    this.created_by_name = data.created_by_name;
    this.created_by_email = data.created_by_email;
    this.updated_by_name = data.updated_by_name;
    this.updated_by_email = data.updated_by_email;
    this.created_at = data.created_at;
    this.owner_name = data.owner_name;
    this.pet_id = data.pet_id;
    this.user_id = data.user_id;
  }
}
