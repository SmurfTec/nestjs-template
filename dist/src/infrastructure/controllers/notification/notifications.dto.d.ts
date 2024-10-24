export declare class CreateNotificationDto {
    message: string;
    resource_name: string;
    resource_id: number;
    is_active: boolean;
    users: number[];
    type: string;
}
export declare class UpdateNotificationDto {
    message: string;
    is_active: boolean;
    type: string;
    users: number[];
    resource_name: string;
    resource_id: number;
}
