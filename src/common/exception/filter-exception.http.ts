import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { CoreApiResponse } from '../responce/core.responce';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  logger: Logger;
  constructor() {
    this.logger = new Logger('Http');
  }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = this.getStatusCode(exception);

    if (code >= 500) {
      this.logger.error(exception);
    }
    response
      .status(200)
      .json(CoreApiResponse.error(code, exception?.response || exception));
  }

  private readonly getStatusCode = (exception: unknown): number => {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  };
}
