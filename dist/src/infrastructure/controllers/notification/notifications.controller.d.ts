import { UserNotificationsUseCases } from './../../../usecases/usernotification/usernotifications.usecases';
import { NotificationsUseCases } from '../../../usecases/notification/notifications.usecases';
import { CreateNotificationDto, UpdateNotificationDto } from './notifications.dto';
export declare class NotificationController {
    private readonly notificationUseCases;
    private readonly userNotificationsUseCases;
    constructor(notificationUseCases: NotificationsUseCases, userNotificationsUseCases: UserNotificationsUseCases);
    createNotification(notification: CreateNotificationDto): Promise<import("../../../domain/models/notifications").FetchNotificationModel>;
    readAllNotification(): Promise<import("../../../domain/models/usernotifications").FetchUserNotificationModel[]>;
    getNotification(id: number): Promise<{
        data: import("../../../domain/models/notifications").FetchNotificationModel;
    }>;
    getOwnNotification(req: any, res: any, next: any): Promise<any>;
    getNotifications(): Promise<import("../../../domain/models/notifications").FetchNotificationModel[]>;
    updateNotification(id: number, notification: UpdateNotificationDto): Promise<import("../../../domain/models/notifications").FetchNotificationModel>;
    deleteNotification(id: number): Promise<void>;
}
