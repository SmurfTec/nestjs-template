import { Users } from 'src/infrastructure/entities/user.entity';
export declare class NotificationModel {
    message: string;
    is_active: boolean;
    users?: Users[];
    resource_name?: string;
    resource_id?: number;
}
export declare class FetchNotificationModel {
    id: number;
    message: string;
    is_active: boolean;
    users: Users[];
    resource_name?: string;
    resource_id?: number;
}
export declare class UpdateNotificationModel {
    message?: string;
    is_active?: boolean;
    users?: Users[];
    resource_name?: string;
    resource_id?: number;
}
