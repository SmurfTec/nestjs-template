import { Users } from 'src/infrastructure/entities/user.entity';

export class NotificationModel {
  message: string;
  is_active: boolean;
  users?: Users[];
  resource_name?: string;
  resource_id?: number;
}

export class FetchNotificationModel {
  id: number;
  message: string;
  is_active: boolean;
  users: Users[];
  resource_name?: string;
  resource_id?: number;
}

export class UpdateNotificationModel {
  message?: string;
  is_active?: boolean;
  users?: Users[];
  resource_name?: string;
  resource_id?: number;
}
