import { DefaultHeadersInterface } from './../../../common/interfaces/default-headers.interface';
import { GetUsersByIdUseCase } from './../../../modules/users/useCase/getById/getById.users.useCase';
import {
  ConflictException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserIdRequestMiddleware implements NestMiddleware {
  constructor(private getUsersByIdUseCase: GetUsersByIdUseCase) {}

  async use(request: Request, res: Response, next: NextFunction) {
    const user_id = request.header('user_id');
    let defaultHeaders: DefaultHeadersInterface;

    if (request.headers.user_id) {
      const result = await this.getUsersByIdUseCase.execute(
        request.headers.user_id as any,
        defaultHeaders,
      );

      if (!result) {
        throw new ConflictException(`This user not exist!`);
      }

      if (
        result.email !== request.headers.useremail ||
        result.name !== request.headers.username
      ) {
        throw new ConflictException(`Conflict in the username or useremail`);
      }
    }

    if (!user_id)
      throw new UnauthorizedException(
        'Validation failed (user_id is expected)',
      );
    next();
  }
}
