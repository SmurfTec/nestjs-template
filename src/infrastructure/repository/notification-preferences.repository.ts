import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NotificationPreferencesModel,
  FetchNotificationPreferencesModel,
  UpdateNotificationPreferencesModel,
} from '../../domain/models/notification-preferences';
import { INotificationPreferences } from '../../domain/repositories/notification-preferences.repository.interface';
import { NotificationPreferences } from '../entities/notification-preferences.entity';

@Injectable()
export class NotificationPreferencesRepository
  implements INotificationPreferences
{
  constructor(
    @InjectRepository(NotificationPreferences)
    private notificationPreferencesRepository: Repository<NotificationPreferences>,
  ) {}

  async createPreferences(
    preferencesModel: NotificationPreferencesModel,
  ): Promise<FetchNotificationPreferencesModel> {
    return await this.notificationPreferencesRepository.save(preferencesModel);
  }

  async getPreferences(
    userId: number,
  ): Promise<FetchNotificationPreferencesModel> {
    const preferences = await this.notificationPreferencesRepository.findOne({
      where: { user_id: userId },
    });

    // If preferences don't exist, return default preferences
    if (!preferences) {
      const defaultPreferences = await this.notificationPreferencesRepository.save({
        user_id: userId,
        email_alerts: true,
        push_notifications: true,
        in_app_digest: true,
        marketing_emails: false,
      });
      return defaultPreferences;
    }

    return preferences;
  }

  async updatePreferences(
    userId: number,
    updatePreferencesModel: UpdateNotificationPreferencesModel,
  ): Promise<FetchNotificationPreferencesModel> {
    const preferences = await this.notificationPreferencesRepository.findOne({
      where: { user_id: userId },
    });

    if (preferences) {
      const updatedPreferences = { ...preferences, ...updatePreferencesModel };
      return this.notificationPreferencesRepository.save(updatedPreferences);
    }

    // If preferences don't exist, create them with the update
    return this.notificationPreferencesRepository.save({
      user_id: userId,
      email_alerts: updatePreferencesModel.email_alerts ?? true,
      push_notifications: updatePreferencesModel.push_notifications ?? true,
      in_app_digest: updatePreferencesModel.in_app_digest ?? true,
      marketing_emails: updatePreferencesModel.marketing_emails ?? false,
    });
  }

  async deletePreferences(userId: number): Promise<void> {
    await this.notificationPreferencesRepository.delete({ user_id: userId });
    return;
  }
}

