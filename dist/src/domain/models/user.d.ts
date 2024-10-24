export declare class UserModel {
    id?: number;
    email: string;
    password: string;
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
}
export declare class UserUpdateModel {
    id?: number;
    email?: string;
    password?: string;
    is_logged_in?: boolean;
    profile?: number;
    is_active?: boolean;
    signup_otp?: number;
    signup_otp_expiry?: Date;
    is_social_login?: boolean;
    is_rere_verified?: boolean;
    is_phone_verified?: boolean;
    is_face_verified?: boolean;
    is_email_verified?: boolean;
    upcoming_email?: string;
    upcoming_email_otp?: number;
    upcoming_email_otp_expiry?: Date;
}
export declare class UserCreatedModel {
    id?: number;
    email: string;
    fullname: string;
    password: string;
    lastLogin?: Date;
    hashRefreshToken?: string;
    is_active?: boolean;
    is_banned?: boolean;
    is_social_login?: boolean;
    is_rere_verified?: boolean;
    is_phone_verified?: boolean;
    is_face_verified?: boolean;
    is_email_verified?: boolean;
}
export declare class FetchUserModel {
    id: number;
    email: string;
    password: string;
    signup_otp?: number;
    signup_otp_expiry?: Date;
    forget_email_otp: number;
    forget_email_otp_expiry: Date;
    fullname: string;
    agent_rera: string;
    is_social_login: boolean;
    is_rere_verified?: boolean;
    is_email_verified: boolean;
    upcoming_email: string;
    upcoming_email_otp: number;
    upcoming_email_otp_expiry: Date;
    allow_notifications: boolean;
    is_active: boolean;
    hashRefreshToken: string;
    is_banned: boolean;
    is_phone_verified?: boolean;
    is_face_verified?: boolean;
}
export declare class UpdateUserModel {
    email?: string;
    password?: string;
    signup_otp?: number;
    forget_email_otp?: number;
    signup_otp_expiry?: Date;
    forget_email_otp_expiry?: Date;
    fullname?: string;
    agent_rera?: string;
    is_social_login?: boolean;
    is_rere_verified?: boolean;
    is_email_verified?: boolean;
    upcoming_email?: string;
    upcoming_email_otp?: number;
    upcoming_email_otp_expiry?: Date;
    allow_notifications?: boolean;
    is_active?: boolean;
    hashRefreshToken?: string;
    is_banned?: boolean;
    is_phone_verified?: boolean;
    is_face_verified?: boolean;
}
export declare class UserWithoutPassword {
    id?: number;
    email: string;
    signup_otp?: number;
    forget_email_otp?: number;
    signup_otp_expiry?: Date;
    forget_email_otp_expiry?: Date;
    fullname?: string;
    agent_rera?: string;
    is_social_login?: boolean;
    is_rere_verified?: boolean;
    is_email_verified?: boolean;
    upcoming_email?: string;
    upcoming_email_otp?: number;
    upcoming_email_otp_expiry?: Date;
    allow_notifications?: boolean;
    is_active?: boolean;
    hashRefreshToken?: string;
    is_banned?: boolean;
    is_phone_verified?: boolean;
    is_face_verified?: boolean;
}
