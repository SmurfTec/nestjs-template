import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { Observable } from 'rxjs';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
declare const RefreshInterceptor_base: new (...args: any[]) => Strategy;
export declare class RefreshInterceptor<T> extends RefreshInterceptor_base implements NestInterceptor<T, any> {
    private readonly loginUsecaseProxy;
    constructor(loginUsecaseProxy: LoginUseCases);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
export {};
