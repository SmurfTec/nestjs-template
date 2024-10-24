import { UserNotificationsUseCases } from './../../../usecases/usernotification/usernotifications.usecases';
import { NotificationsUseCases } from '../../../usecases/notification/notifications.usecases';
import { CreateNotificationDto, UpdateNotificationDto } from './notifications.dto';
export declare class NotificationController {
    private readonly notificationUseCases;
    private readonly userNotificationsUseCases;
    constructor(notificationUseCases: NotificationsUseCases, userNotificationsUseCases: UserNotificationsUseCases);
    createNotification(notification: CreateNotificationDto): any;
    readAllNotification(): any;
    getNotification(id: number): any;
    getOwnNotification(req: any, res: any, next: any): Promise<any>;
    getNotifications(): any;
    updateNotification(id: number, notification: UpdateNotificationDto): any;
    deleteNotification(id: number): any;
}
