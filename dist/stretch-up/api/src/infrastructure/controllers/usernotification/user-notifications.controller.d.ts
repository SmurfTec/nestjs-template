import { UserNotificationsUseCases } from '../../../usecases/usernotification/usernotifications.usecases';
import { CreateUserNotificationDto, UpdateUserNotificationDto } from './user-notifications.dto';
export declare class UserNotificationController {
    private readonly userNotificationUseCases;
    constructor(userNotificationUseCases: UserNotificationsUseCases);
    createUserNotification(userNotification: CreateUserNotificationDto): any;
    getUserNotification(id: number): any;
    getAUserNotifications(): any;
    getUserNotifications(): any;
    updateUserNotification(id: number, userNotification: UpdateUserNotificationDto): any;
    deleteUserNotification(id: number): any;
}
