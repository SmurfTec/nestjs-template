import { NotificationPreferenceUseCases } from '../../../usecases/notificationpreference/notificationpreference.usecases';
import { CreateNotificationPreferenceDto, UpdateNotificationPreferenceDto } from './notificationpreference.dto';
export declare class NotificationPreferenceController {
    private readonly notificationPreferenceUseCases;
    constructor(notificationPreferenceUseCases: NotificationPreferenceUseCases);
    createNotificationPreference(notificationPreference: CreateNotificationPreferenceDto): Promise<import("../../../domain/models/notificationpreference").FetchNotificationPreferenceModel>;
    getNotificationPreference(id: number): Promise<{
        data: import("../../../domain/models/notificationpreference").FetchNotificationPreferenceModel;
    }>;
    getNotificationPreferences(): Promise<import("../../../domain/models/notificationpreference").FetchNotificationPreferenceModel[]>;
    updateNotificationPreference(id: number, notificationPreference: UpdateNotificationPreferenceDto): Promise<import("../../../domain/models/notificationpreference").FetchNotificationPreferenceModel>;
    deleteNotificationPreference(id: number): Promise<void>;
}
