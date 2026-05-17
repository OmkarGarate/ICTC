import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {

    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception;

    console.log('\n================ ERROR ================');

    console.log('METHOD:', request.method);

    console.log('URL:', request.url);

    console.log('STATUS:', status);

    console.log('ERROR:', errorResponse);

    console.log('STACK:', exception);

    console.log('=======================================\n');

    response.status(status).json({
      statusCode: status,
      message:
        typeof errorResponse === 'object'
          ? (errorResponse as any).message
          : 'Internal server error',
      data: [],
    });
  }
}