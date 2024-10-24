export declare class CreateUserDto {
    email: string;
    password: string;
    signup_otp: number;
    forget_email_otp: number;
    signup_otp_expiry: Date;
    forget_email_otp_expiry: Date;
    fullname: string;
    agent_rera: string;
    is_social_login: boolean;
    is_email_verified: boolean;
    upcoming_email: string;
    upcoming_email_otp: number;
    upcoming_email_otp_expiry: Date;
    allow_notifications: boolean;
    is_active: boolean;
    last_login: Date;
    hashRefreshToken: string;
    is_banned: boolean;
}
export declare class UpdateUserDto {
    email: string;
    password: string;
    signup_otp: number;
    forget_email_otp: number;
    signup_otp_expiry: Date;
    forget_email_otp_expiry: Date;
    fullname: string;
    agent_rera: string;
    is_social_login: boolean;
    is_email_verified: boolean;
    upcoming_email: string;
    upcoming_email_otp: number;
    upcoming_email_otp_expiry: Date;
    allow_notifications: boolean;
    is_active: boolean;
    last_login: Date;
    hashRefreshToken: string;
    is_banned: boolean;
}
export declare class banUserDto {
    ids: number[];
}
export declare class CreateAdminDto {
    email: string;
    fullName: string;
    phone: string;
    password: string;
    role: string;
    description: string;
}
