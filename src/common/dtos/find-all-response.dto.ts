import { ApiProperty } from '@nestjs/swagger';

export function getAllResponseForType(type: any): any {
  class GetAllResponseForType<type> {
    @ApiProperty({ example: 1 })
    count: number;

    @ApiProperty({ example: 20 })
    limit: number;

    @ApiProperty({ example: 1 })
    page: number;

    @ApiProperty({ example: 1 })
    totalPages: number;

    @ApiProperty({ type, isArray: true })
    data: type[];
  }

  Object.defineProperty(GetAllResponseForType, 'name', {
    value: `GetManyResponseFor${type.name}`,
  });

  return GetAllResponseForType;
}
