import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import {
  NotificationPreferencesModel,
  UpdateNotificationPreferencesModel,
} from '../../domain/models/notification-preferences';
import { NotificationPreferencesRepository } from '../../infrastructure/repository/notification-preferences.repository';
import { CacheService } from '../../infrastructure/common/caching/cache.service';

@Injectable()
export class NotificationPreferencesUseCases {
  constructor(
    private readonly notificationPreferencesRepository: NotificationPreferencesRepository,
    private readonly cacheService: CacheService,
  ) {}

  async createPreferences(preferencesModel: NotificationPreferencesModel) {
    return await this.notificationPreferencesRepository.createPreferences(
      preferencesModel,
    );
  }

  async getPreferences(userId: number) {
    const cacheKey = `notification_preferences:${userId}`;

    // Try to get from cache first
    const cachedPreferences = await this.cacheService.get(cacheKey);
    if (cachedPreferences) {
      return { data: cachedPreferences };
    }

    const data = await this.notificationPreferencesRepository.getPreferences(
      userId,
    );

    if (!data) {
      throw new HttpException(
        'Notification preferences not found',
        HttpStatus.NOT_FOUND,
      );
    }

    // Cache for 10 minutes (600 seconds)
    await this.cacheService.set(cacheKey, data, 10 * 60 * 1000);

    return { data };
  }

  async updatePreferences(
    userId: number,
    updatePreferencesModel: UpdateNotificationPreferencesModel,
  ) {
    const updatedPreferences =
      await this.notificationPreferencesRepository.updatePreferences(
        userId,
        updatePreferencesModel,
      );

    // Invalidate cache
    await this.cacheService.delete(`notification_preferences:${userId}`);

    return updatedPreferences;
  }

  async enableAllPreferences(userId: number) {
    const updateModel: UpdateNotificationPreferencesModel = {
      email_alerts: true,
      push_notifications: true,
      in_app_digest: true,
      marketing_emails: true,
    };

    return await this.updatePreferences(userId, updateModel);
  }

  async disableAllPreferences(userId: number) {
    const updateModel: UpdateNotificationPreferencesModel = {
      email_alerts: false,
      push_notifications: false,
      in_app_digest: false,
      marketing_emails: false,
    };

    return await this.updatePreferences(userId, updateModel);
  }

  async deletePreferences(userId: number) {
    // Invalidate cache
    await this.cacheService.delete(`notification_preferences:${userId}`);
    return await this.notificationPreferencesRepository.deletePreferences(
      userId,
    );
  }
}

