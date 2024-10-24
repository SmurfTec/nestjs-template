import { NotificationModel, UpdateNotificationModel } from '../../domain/models/notifications';
import { NotificationsRepository } from '../../infrastructure/repository/notifications.repository';
import { UserNotificationsUseCases } from '../usernotification/usernotifications.usecases';
export declare class NotificationsUseCases {
    private readonly notificationRepository;
    private readonly userNotificationsUseCases;
    constructor(notificationRepository: NotificationsRepository, userNotificationsUseCases: UserNotificationsUseCases);
    createNotification(notificationModel: NotificationModel): Promise<import("../../domain/models/notifications").FetchNotificationModel>;
    createNotificationForCertainOrAllUsers(notificationModel: NotificationModel): Promise<import("../../domain/models/notifications").FetchNotificationModel>;
    getNotification(id: number): Promise<{
        data: import("../../domain/models/notifications").FetchNotificationModel;
    }>;
    getOwnNotifications(): Promise<any>;
    getNotifications(): Promise<import("../../domain/models/notifications").FetchNotificationModel[]>;
    getTypeAllNotifications(): Promise<import("../../domain/models/notifications").FetchNotificationModel[]>;
    getNotificationUsers(id: number): Promise<any>;
    updateNotification(id: number, notificationUpdateModel: UpdateNotificationModel): Promise<import("../../domain/models/notifications").FetchNotificationModel>;
    deleteNotification(id: number): Promise<void>;
}
