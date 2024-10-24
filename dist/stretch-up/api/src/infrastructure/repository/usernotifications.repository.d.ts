import { Repository } from 'typeorm';
import { UserNotificationModel, FetchUserNotificationModel, UpdateUserNotificationModel } from '../../domain/models/usernotifications';
import { IUserNotification } from '../../domain/repositories/usernotifications.repository.interface';
import { UserNotifications } from '../entities/usernotifications.entity';
export declare class UserNotificationsRepository implements IUserNotification {
    private userNotificationRepository;
    constructor(userNotificationRepository: Repository<UserNotifications>);
    createUserNotification(userNotificationModel: UserNotificationModel): Promise<FetchUserNotificationModel>;
    upsertUserNotification(userNotificationModel: UserNotificationModel[]): Promise<any>;
    createUserNotifications(userNotificationsModel: UserNotificationModel[]): Promise<FetchUserNotificationModel[]>;
    getUserNotification(id: number): Promise<FetchUserNotificationModel>;
    getNotificationUsers(id: number): Promise<FetchUserNotificationModel[]>;
    getAUsersNotifications(id: number): Promise<FetchUserNotificationModel[]>;
    checkUserNotification(userId: number, notificationId: number): Promise<boolean>;
    getAUsersSeenNotifications(id: number): Promise<FetchUserNotificationModel[]>;
    getAUsersUnSeenNotifications(id: number): Promise<FetchUserNotificationModel[]>;
    setSeenForAUserNotification(userId: number, notificationId: number): Promise<FetchUserNotificationModel>;
    setSeenForAllUserNotification(userId: number): Promise<FetchUserNotificationModel[]>;
    getUserNotifications(): Promise<FetchUserNotificationModel[]>;
    updateUserNotification(id: number, updateUserNotificationModel: UpdateUserNotificationModel): Promise<FetchUserNotificationModel>;
    deleteUserNotification(id: number): Promise<void>;
}
