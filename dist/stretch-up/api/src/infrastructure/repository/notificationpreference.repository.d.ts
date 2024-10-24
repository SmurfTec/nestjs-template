import { Repository } from 'typeorm';
import { NotificationPreferenceModel, FetchNotificationPreferenceModel, UpdateNotificationPreferenceModel } from '../../domain/models/notificationpreference';
import { INotificationPreference } from '../../domain/repositories/notificationpreference.repository.interface';
import { NotificationPreferences } from '../entities/notificationpreference.entity';
export declare class NotificationPreferenceRepository implements INotificationPreference {
    private notificationPreferenceRepository;
    constructor(notificationPreferenceRepository: Repository<NotificationPreferences>);
    createNotificationPreference(notificationPreferenceModel: NotificationPreferenceModel): Promise<FetchNotificationPreferenceModel>;
    getNotificationPreference(id: number): Promise<FetchNotificationPreferenceModel>;
    getNotificationPreferences(): Promise<FetchNotificationPreferenceModel[]>;
    updateNotificationPreference(id: number, updateNotificationPreferenceModel: UpdateNotificationPreferenceModel): Promise<FetchNotificationPreferenceModel>;
    deleteNotificationPreference(id: number): Promise<void>;
}
