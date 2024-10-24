import { NotificationModel, FetchNotificationModel, UpdateNotificationModel } from '../models/notifications';
export interface INotification {
    createNotification(notificationModel: NotificationModel): Promise<FetchNotificationModel>;
    getNotification(id: number): Promise<FetchNotificationModel[]>;
    getNotifications(): Promise<FetchNotificationModel[]>;
    updateNotification(id: number, updateNotificationModel: UpdateNotificationModel): Promise<FetchNotificationModel>;
    deleteNotification(id: number): Promise<void>;
}
