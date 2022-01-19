import { ApiProperty } from '@nestjs/swagger';

export function getResponseForType(type: any): any {
  class ResponseForType<type> {
    @ApiProperty({ type })
    data: type[];
  }

  Object.defineProperty(ResponseForType, 'name', {
    value: `ResponseFor${type.name}`,
  });

  return ResponseForType;
}
