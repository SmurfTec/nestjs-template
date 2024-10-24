import { NotificationsUseCases } from 'src/usecases/notification/notifications.usecases';
export declare class MyCronJob {
    private readonly notificationsUseCases;
    constructor(notificationsUseCases: NotificationsUseCases);
    private readonly logger;
    handleCron(): Promise<void>;
}
