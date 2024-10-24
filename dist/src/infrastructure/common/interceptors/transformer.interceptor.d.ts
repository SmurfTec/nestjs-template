import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
export declare class ResponseFormat<T> {
    isArray: boolean;
    path: string;
    duration: string;
    method: string;
    data: T;
}
export declare class TranformerInterceptor<T> implements NestInterceptor {
    private reflector;
    constructor(reflector: Reflector);
    transformer(data: any, tranformTo: any): any;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
