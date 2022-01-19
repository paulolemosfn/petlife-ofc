import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const DefaultHeaders = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as Request;
    return {
      username: req.headers.username,
      useremail: req.headers.useremail,
    };
  },
);
