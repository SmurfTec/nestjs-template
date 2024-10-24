import { UserNotificationsUseCases } from '../../../usecases/usernotification/usernotifications.usecases';
import { CreateUserNotificationDto, UpdateUserNotificationDto } from './user-notifications.dto';
export declare class UserNotificationController {
    private readonly userNotificationUseCases;
    constructor(userNotificationUseCases: UserNotificationsUseCases);
    createUserNotification(userNotification: CreateUserNotificationDto): Promise<import("../../../domain/models/usernotifications").FetchUserNotificationModel>;
    getUserNotification(id: number): Promise<{
        data: import("../../../domain/models/usernotifications").FetchUserNotificationModel;
    }>;
    getAUserNotifications(): Promise<import("../../../domain/models/usernotifications").FetchUserNotificationModel[]>;
    getUserNotifications(): Promise<import("../../../domain/models/usernotifications").FetchUserNotificationModel[]>;
    updateUserNotification(id: number, userNotification: UpdateUserNotificationDto): Promise<import("../../../domain/models/usernotifications").FetchUserNotificationModel>;
    deleteUserNotification(id: number): Promise<void>;
}
