import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { getAllResponseForType } from '../../../common/dtos/find-all-response.dto';

export const CustomApiResponseGetAllWrapper = (data: {
  status?: number;
  description?: string;
  type: any;
}) => {
  return applyDecorators(
    ApiResponse({
      status: data.status,
      description: data.description,
      type: getAllResponseForType(data.type),
    }),
  );
};
