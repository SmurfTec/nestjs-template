import {
  NotificationPreferencesModel,
  FetchNotificationPreferencesModel,
  UpdateNotificationPreferencesModel,
} from '../models/notification-preferences';

export interface INotificationPreferences {
  createPreferences(
    preferencesModel: NotificationPreferencesModel,
  ): Promise<FetchNotificationPreferencesModel>;
  getPreferences(userId: number): Promise<FetchNotificationPreferencesModel>;
  updatePreferences(
    userId: number,
    updatePreferencesModel: UpdateNotificationPreferencesModel,
  ): Promise<FetchNotificationPreferencesModel>;
  deletePreferences(userId: number): Promise<void>;
}

