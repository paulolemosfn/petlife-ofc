import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UsernameRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const username = req.header('username');

    if (!username)
      throw new UnauthorizedException(
        'Validation failed (username is expected)',
      );

    next();
  }
}
