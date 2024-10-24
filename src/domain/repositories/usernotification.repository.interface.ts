import {
  UserNotificationModel,
  FetchUserNotificationModel,
  UpdateUserNotificationModel,
} from '../models/UserNotification';
export interface IUserNotification {
  createUserNotification(
    userNotificationModel: UserNotificationModel,
  ): Promise<FetchUserNotificationModel>;
  getUserNotification(id: number): Promise<FetchUserNotificationModel>;
  getUserNotifications(): Promise<FetchUserNotificationModel[]>;
  updateUserNotification(
    id: number,
    updateUserNotificationModel: UpdateUserNotificationModel,
  ): Promise<FetchUserNotificationModel>;
  deleteUserNotification(id: number): Promise<void>;
}
