import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const message = (<any>exception.getResponse()).message;

    if (Array.isArray(message) && message.length > 0) {
      const errors = message.map((error: ValidationError) => {
        return {
          param: error.property,
          value: error.value,
          msg: error.constraints
            ? Object.values(error.constraints)[0]
            : message,
        };
      });

      return response.status(status).json({
        code: status,
        message: 'Bad Request',
        timestamp: new Date().toISOString(),
        errors,
      });
    }

    response.status(status).json({
      code: status,
      message: 'Bad Request',
      timestamp: new Date().toISOString(),
      errors: [message],
    });
  }
}
