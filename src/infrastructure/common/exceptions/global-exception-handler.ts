import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    console.log(exception);

    const status = exception.hasOwnProperty('response')
      ? exception['response']['statusCode']
        ? exception['response']['statusCode']
        : exception['status']
        ? exception['status']
        : 500
      : exception.hasOwnProperty('status') && exception['status'] === 500
      ? 500
      : exception['detail']
      ? 400
      : 500;

    const message = exception.hasOwnProperty('response')
      ? exception['response']['message'] || exception['message']
      : exception.hasOwnProperty('status') && exception['status'] === 500
      ? 'Internal Server Error'
      : exception['detail']
      ? exception['detail']
      : 'Internal Server Error';

    const responseBody = {
      message,
      status,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
