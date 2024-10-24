import { Repository } from 'typeorm';
import { NotificationModel, FetchNotificationModel, UpdateNotificationModel } from '../../domain/models/notification';
import { INotification } from '../../domain/repositories/notification.repository.interface';
import { Notifications } from '../entities/notification.entity';
export declare class NotificationRepository implements INotification {
    private notificationRepository;
    constructor(notificationRepository: Repository<Notifications>);
    createNotification(notificationModel: NotificationModel): Promise<FetchNotificationModel>;
    getNotification(id: number): Promise<FetchNotificationModel>;
    getNotifications(): Promise<FetchNotificationModel[]>;
    updateNotification(id: number, updateNotificationModel: UpdateNotificationModel): Promise<FetchNotificationModel>;
    deleteNotification(id: number): Promise<void>;
}
