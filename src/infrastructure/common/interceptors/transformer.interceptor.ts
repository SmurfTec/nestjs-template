import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import e from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../user.data';
import { Reflector } from '@nestjs/core';
import { transformationRules } from './tranformation-rules';

export class ResponseFormat<T> {
  @ApiProperty()
  isArray: boolean;
  @ApiProperty()
  path: string;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  method: string;

  data: T;
}

@Injectable()
export class TranformerInterceptor<T> implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  transformer(data, tranformTo) {
    let returnData;
    if (Array.isArray(data)) {
      console.log('data123', data);
      console.log('tranformTo', tranformTo);
      returnData = [];
      for (let i = 0; i < data.length; i++) {
        const obj = {};
        for (let j = 0; j < tranformTo.length; j++) {
          obj[tranformTo[j]] = data[i][tranformTo[j]];
        }
        returnData.push(obj);
      }
      return returnData;
    } else {
      returnData = {};
      for (let i = 0; i < tranformTo.length; i++) {
        returnData[tranformTo[i]] = data[tranformTo[i]];
      }
      return returnData;
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    // const user = UserData.getUserData();
    const dataFor = this.reflector.getAllAndOverride<string>('transform', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!(dataFor in transformationRules)) {
      throw new HttpException(
        'User In Not Authorized',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return next.handle().pipe(
      map((data) => {
        const returnData = this.transformer(data, transformationRules[dataFor]);
        return returnData;
        // return {
        //   data: returnData,
        //   isArray: Array.isArray(data),
        //   path: request.path,
        //   duration: `${Date.now() - now}ms`,
        //   method: request.method,
        // };
      }),
    );
  }
}
