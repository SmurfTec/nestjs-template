import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { Observable } from 'rxjs';
declare const RefreshInterceptor_base: new (...args: any[]) => Strategy;
export declare class RefreshInterceptor<T> extends RefreshInterceptor_base implements NestInterceptor<T, any> {
    constructor();
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
export {};
