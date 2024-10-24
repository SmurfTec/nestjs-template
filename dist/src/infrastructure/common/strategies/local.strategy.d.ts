import { Strategy } from 'passport-local';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { PermissionsUseCases } from 'src/usecases/auth/permission.usecases';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly loginUsecaseProxy;
    private readonly permissionUsecase;
    constructor(loginUsecaseProxy: LoginUseCases, permissionUsecase: PermissionsUseCases);
    validate(email: string, password: string): Promise<{
        user: {
            permissions: any;
            roles: any;
            id?: number;
            email: string;
            signup_otp?: number;
            signup_otp_expiry?: Date;
            fullname?: string;
            forget_email_otp?: number;
            forget_email_otp_expiry?: Date;
            agent_rera?: string;
            is_social_login?: boolean;
            is_email_verified?: boolean;
            upcoming_email?: string;
            upcoming_email_otp?: number;
            upcoming_email_otp_expiry?: Date;
            allow_notifications?: boolean;
            is_active?: boolean;
            hashRefreshToken?: string;
            is_banned?: boolean;
            is_rere_verified?: boolean;
            is_phone_verified?: boolean;
            is_face_verified?: boolean;
        };
    }>;
}
export {};
