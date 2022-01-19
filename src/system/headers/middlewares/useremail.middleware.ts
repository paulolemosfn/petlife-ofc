import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UseremailRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const useremail = req.header('useremail');

    if (!useremail)
      throw new UnauthorizedException(
        'Validation failed (useremail is expected)',
      );

    next();
  }
}
