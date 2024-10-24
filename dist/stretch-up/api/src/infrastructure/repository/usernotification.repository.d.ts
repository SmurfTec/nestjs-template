import { Repository } from 'typeorm';
import { UserNotificationModel, FetchUserNotificationModel, UpdateUserNotificationModel } from '../../domain/models/usernotification';
import { IUserNotification } from '../../domain/repositories/usernotification.repository.interface';
import { UserNotifications } from '../entities/usernotification.entity';
export declare class UserNotificationRepository implements IUserNotification {
    private userNotificationRepository;
    constructor(userNotificationRepository: Repository<UserNotifications>);
    createUserNotification(userNotificationModel: UserNotificationModel): Promise<FetchUserNotificationModel>;
    getUserNotification(id: number): Promise<FetchUserNotificationModel>;
    getUserNotifications(): Promise<FetchUserNotificationModel[]>;
    updateUserNotification(id: number, updateUserNotificationModel: UpdateUserNotificationModel): Promise<FetchUserNotificationModel>;
    deleteUserNotification(id: number): Promise<void>;
    readAllNotifications(userId: any): Promise<void>;
}
