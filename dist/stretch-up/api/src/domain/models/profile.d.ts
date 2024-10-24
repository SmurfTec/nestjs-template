export declare class ProfileModel {
    id?: number;
    phone?: string;
    phone_otp?: number;
    phone_otp_expiry?: Date;
    upcoming_phone?: string;
    upcoming_phone_otp?: number;
    upcoming_phone_otp_expiry?: Date;
    document_front?: string;
    document_back?: string;
    photo?: string;
    user?: number;
}
export declare class FetchProfileModel {
    id?: number;
    phone?: string;
    phone_otp?: number;
    phone_otp_expiry?: Date;
    upcoming_phone?: string;
    upcoming_phone_otp?: number;
    upcoming_phone_otp_expiry?: Date;
    document_front?: string;
    document_back?: string;
    photo?: string;
    user?: number;
}
export interface ProfileCreatedModel {
    id?: number;
    phone?: string;
    phone_otp?: number;
    phone_otp_expiry?: Date;
    upcoming_phone: string;
    upcoming_phone_otp: number;
    upcoming_phone_otp_expiry: Date;
    document_front: string;
    document_back: string;
    photo: string;
    user: number;
}
export interface ProfileUpdateModel {
    id?: number;
    phone?: string;
    phone_otp?: number;
    phone_otp_expiry?: Date;
    upcoming_phone?: string;
    upcoming_phone_otp?: number;
    upcoming_phone_otp_expiry?: Date;
    document_front?: string;
    document_back?: string;
    photo?: string;
    user?: number;
}
