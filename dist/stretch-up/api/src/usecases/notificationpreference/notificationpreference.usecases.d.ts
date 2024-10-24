import { NotificationPreferenceModel, UpdateNotificationPreferenceModel } from '../../domain/models/notificationpreference';
import { NotificationPreferenceRepository } from '../../infrastructure/repository/notificationpreference.repository';
export declare class NotificationPreferenceUseCases {
    private readonly notificationPreferenceRepository;
    constructor(notificationPreferenceRepository: NotificationPreferenceRepository);
    createNotificationPreference(notificationPreferenceModel: NotificationPreferenceModel): Promise<import("../../domain/models/notificationpreference").FetchNotificationPreferenceModel>;
    getNotificationPreference(id: number): Promise<{
        data: import("../../domain/models/notificationpreference").FetchNotificationPreferenceModel;
    }>;
    getNotificationPreferences(): Promise<import("../../domain/models/notificationpreference").FetchNotificationPreferenceModel[]>;
    updateNotificationPreference(id: number, notificationPreferenceUpdateModel: UpdateNotificationPreferenceModel): Promise<import("../../domain/models/notificationpreference").FetchNotificationPreferenceModel>;
    deleteNotificationPreference(id: number): Promise<void>;
}
