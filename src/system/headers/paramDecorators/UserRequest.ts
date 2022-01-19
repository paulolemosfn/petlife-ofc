import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserHeadersRequest = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return {
      username: request.headers.username,
      useremail: request.headers.useremail,
      user_id: request.headers.user_id,
    };
  },
);
