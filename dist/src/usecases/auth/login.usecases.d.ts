import { EnvironmentConfigService } from '../../infrastructure/config/environment-config/environment-config.service';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { BcryptService } from '../../infrastructure/services/bcrypt/bcrypt.service';
import { JwtTokenService } from '../../infrastructure/services/jwt/jwt.service';
import { ProfilesUseCases } from '../profile/profile.usecases';
export declare class LoginUseCases {
    private readonly jwtTokenService;
    private readonly jwtConfig;
    private readonly userRepository;
    private readonly profileUsecases;
    private readonly bcryptService;
    constructor(jwtTokenService: JwtTokenService, jwtConfig: EnvironmentConfigService, userRepository: UserRepository, profileUsecases: ProfilesUseCases, bcryptService: BcryptService);
    getCookieWithJwtToken(email: string): Promise<string>;
    getCookieWithJwtRefreshToken(email: string): Promise<string>;
    getCookieForAuthCheck(): string;
    validateUserForLocalStragtegy(email: string, pass: string): Promise<{
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
    }>;
    validateEmailForLocalStragtegy(email: string): Promise<import("../../domain/models/user").UserModel>;
    validateUserForJWTStragtegy(email: string): Promise<import("../../domain/models/user").UserModel>;
    updateLoginTime(email: string): Promise<void>;
    setCurrentRefreshToken(refreshToken: string, email: string): Promise<void>;
    getUserIfRefreshTokenMatches(refreshToken: string, email: string): Promise<import("../../domain/models/user").UserModel>;
    signInWithGoogle(credentialToken: string): Promise<{
        data: any;
    }>;
}
