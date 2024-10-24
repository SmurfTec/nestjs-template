export declare class NotificationPreferenceModel {
    category: string;
    allow_email: boolean;
    allow_push: boolean;
    user: number;
}
export declare class FetchNotificationPreferenceModel {
    id: number;
    category: string;
    allow_email: boolean;
    allow_push: boolean;
    user: number;
}
export declare class UpdateNotificationPreferenceModel {
    category?: string;
    allow_email?: boolean;
    allow_push?: boolean;
    user?: number;
}
