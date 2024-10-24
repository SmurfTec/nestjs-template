export declare class CreateProfileDto {
    phone: string;
    upcoming_phone: string;
    upcoming_phone_otp: number;
    upcoming_phone_otp_expiry: Date;
    document_front: string;
    document_back: string;
    photo: string;
    user: number;
}
export declare class UpdateProfileDto {
    phone: string;
    email: string;
    upcoming_phone: string;
    upcoming_phone_otp: number;
    upcoming_phone_otp_expiry: Date;
    document_front: string;
    document_back: string;
    photo: string;
    user: number;
}
