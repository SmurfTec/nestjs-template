import { NotificationPreferenceModel,FetchNotificationPreferenceModel,UpdateNotificationPreferenceModel } from '../models/NotificationPreference';
export interface INotificationPreference {
createNotificationPreference(notificationPreferenceModel:NotificationPreferenceModel): Promise<FetchNotificationPreferenceModel>;
getNotificationPreference(id:number) : Promise<FetchNotificationPreferenceModel>;
getNotificationPreferences() : Promise<FetchNotificationPreferenceModel[]>;
updateNotificationPreference(id: number, updateNotificationPreferenceModel:UpdateNotificationPreferenceModel): Promise<FetchNotificationPreferenceModel>;
deleteNotificationPreference(id:number) : Promise<void>;
}
