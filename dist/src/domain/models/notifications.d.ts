export declare class NotificationModel {
    message: string;
    is_active: boolean;
    type?: string;
    users?: number[];
    resource_name?: string;
    resource_id?: number;
    from_user_id?: number;
    from_user_name?: string;
}
export declare class FetchNotificationModel {
    id: number;
    message: string;
    is_active: boolean;
    type?: string;
    resource_name?: string;
    resource_id?: number;
    from_user_id?: number;
    from_user_name?: string;
}
export declare class UpdateNotificationModel {
    message?: string;
    is_active?: boolean;
    type?: string;
    users?: number[];
    resource_name?: string;
    resource_id?: number;
    from_user_id?: number;
    from_user_name?: string;
}
