import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { TokenPayload } from '../../../domain/models/auth';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly configService;
    private readonly loginUsecaseProxy;
    constructor(configService: EnvironmentConfigService, loginUsecaseProxy: LoginUseCases);
    validate(request: Request, payload: TokenPayload): Promise<import("../../../domain/models/user").UserModel>;
}
export {};
