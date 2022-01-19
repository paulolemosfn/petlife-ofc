import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { getResponseForType } from '../../../common/dtos/response-wrapper.dto';

export const CustomApiResponseWrapper = (data: {
  status?: number;
  description?: string;
  type: any;
}) => {
  return applyDecorators(
    ApiResponse({
      status: data.status,
      description: data.description,
      type: getResponseForType(data.type),
    }),
  );
};
