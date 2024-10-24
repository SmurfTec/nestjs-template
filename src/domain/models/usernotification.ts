export class UserNotificationModel {
  is_active: boolean;
  user?: number;
  notification?: number;
}

export class FetchUserNotificationModel {
  id: number;
  is_active: boolean;
  user: number;
  notification: number;
}

export class UpdateUserNotificationModel {
  is_active?: boolean;
  user?: number;
  notification?: number;
}
