export class UserNotificationModel {
  seen?: boolean;
  is_active?: boolean;
  notification: number;
  user: number;
}

export class FetchUserNotificationModel {
  id: number;
  seen: boolean;
  is_active: boolean;
  notification: number;
  user: number;
}

export class UpdateUserNotificationModel {
  seen?: boolean;
  is_active?: boolean;
  notification?: number;
  user?: number;
}
