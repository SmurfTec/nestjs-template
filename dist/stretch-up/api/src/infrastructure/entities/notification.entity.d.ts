import { Users } from './user.entity';
export declare class Notifications {
    id: number;
    message: string;
    resource_name?: string;
    resource_id?: number;
    from_user_id?: number;
    from_user_name?: string;
    is_active: boolean;
    users: Users[];
    created_on: Date;
    updated_on: Date;
}
