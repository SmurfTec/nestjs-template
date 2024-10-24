import { Strategy } from 'passport-jwt';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { EnvironmentConfigService } from '../../../infrastructure/config/environment-config/environment-config.service';
import { PermissionsUseCases } from 'src/usecases/auth/permission.usecases';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly loginUsecase;
    private readonly permissionUsecase;
    private readonly configService;
    constructor(loginUsecase: LoginUseCases, permissionUsecase: PermissionsUseCases, configService: EnvironmentConfigService);
    validate(payload: any): Promise<import("../../../domain/models/user").UserModel>;
}
export {};
