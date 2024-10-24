import { Repository } from 'typeorm';
import { NotificationModel, FetchNotificationModel, UpdateNotificationModel } from '../../domain/models/notifications';
import { INotification } from '../../domain/repositories/notifications.repository.interface';
import { Notifications } from '../entities/notifications.entity';
export declare class NotificationsRepository implements INotification {
    private notificationRepository;
    constructor(notificationRepository: Repository<Notifications>);
    createNotification(notificationModel: NotificationModel): Promise<FetchNotificationModel>;
    getNotification(id: number): Promise<FetchNotificationModel[]>;
    getNotifications(): Promise<FetchNotificationModel[]>;
    getTypeAllNotifications(): Promise<FetchNotificationModel[]>;
    updateNotification(id: number, updateNotificationModel: UpdateNotificationModel): Promise<FetchNotificationModel>;
    deleteNotification(id: number): Promise<void>;
}
