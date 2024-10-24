import { NotificationPreferenceUseCases } from '../../../usecases/notificationpreference/notificationpreference.usecases';
import { CreateNotificationPreferenceDto, UpdateNotificationPreferenceDto } from './notificationpreference.dto';
export declare class NotificationPreferenceController {
    private readonly notificationPreferenceUseCases;
    constructor(notificationPreferenceUseCases: NotificationPreferenceUseCases);
    createNotificationPreference(notificationPreference: CreateNotificationPreferenceDto): any;
    getNotificationPreference(id: number): any;
    getNotificationPreferences(): any;
    updateNotificationPreference(id: number, notificationPreference: UpdateNotificationPreferenceDto): any;
    deleteNotificationPreference(id: number): any;
}
