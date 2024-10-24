import { Server, Socket } from 'socket.io';
import { UserUseCases } from 'src/usecases/user/user.usecases';
import { NotificationsUseCases } from 'src/usecases/notification/notifications.usecases';
import { UserNotificationsUseCases } from 'src/usecases/usernotification/usernotifications.usecases';
export declare class NotificationGateway {
    private userUseCases;
    private notificationsUseCases;
    private userNotificationsUseCases;
    server: Server;
    constructor(userUseCases: UserUseCases, notificationsUseCases: NotificationsUseCases, userNotificationsUseCases: UserNotificationsUseCases);
    onPermissionChange(data: unknown, client: Socket): Promise<any>;
}
