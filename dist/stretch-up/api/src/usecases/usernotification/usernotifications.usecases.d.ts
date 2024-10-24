import { UserNotificationModel, UpdateUserNotificationModel } from '../../domain/models/usernotifications';
import { UserNotificationsRepository } from '../../infrastructure/repository/usernotifications.repository';
export declare class UserNotificationsUseCases {
    private readonly userNotificationRepository;
    constructor(userNotificationRepository: UserNotificationsRepository);
    createUserNotification(userNotificationModel: UserNotificationModel): Promise<import("../../domain/models/usernotifications").FetchUserNotificationModel>;
    readAllNotifications(userId: number): Promise<import("../../domain/models/usernotifications").FetchUserNotificationModel[]>;
    upsertUserNotification(userNotificationModel: UserNotificationModel[]): Promise<any>;
    createUserNotifications(userNotificationsModel: UserNotificationModel[]): Promise<import("../../domain/models/usernotifications").FetchUserNotificationModel[]>;
    getAUsersNotifications(id: number): Promise<import("../../domain/models/usernotifications").FetchUserNotificationModel[]>;
    checkUserNotifications(userId: number, notificationId: number): Promise<boolean>;
    getOwnNotification(): Promise<import("../../domain/models/usernotifications").FetchUserNotificationModel[]>;
    getNotificationUsers(id: number): Promise<import("../../domain/models/usernotifications").FetchUserNotificationModel[]>;
    getUserNotification(id: number): Promise<{
        data: import("../../domain/models/usernotifications").FetchUserNotificationModel;
    }>;
    getUserNotifications(): Promise<import("../../domain/models/usernotifications").FetchUserNotificationModel[]>;
    updateUserNotification(id: number, userNotificationUpdateModel: UpdateUserNotificationModel): Promise<import("../../domain/models/usernotifications").FetchUserNotificationModel>;
    deleteUserNotification(id: number): Promise<void>;
}
