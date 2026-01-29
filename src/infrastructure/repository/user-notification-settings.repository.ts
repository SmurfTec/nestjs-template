import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotificationSettings } from '../entities/user-notification-settings.entity';

@Injectable()
export class UserNotificationSettingsRepository {
  constructor(
    @InjectRepository(UserNotificationSettings)
    private settingsRepository: Repository<UserNotificationSettings>,
  ) {}

  async findByUserId(userId: number): Promise<UserNotificationSettings | null> {
    return await this.settingsRepository.findOne({
      where: { user_id: userId },
    });
  }

  async createOrUpdate(
    userId: number,
    settings: Partial<UserNotificationSettings>,
  ): Promise<UserNotificationSettings> {
    const existing = await this.findByUserId(userId);
    
    if (existing) {
      Object.assign(existing, settings);
      return await this.settingsRepository.save(existing);
    }

    return await this.settingsRepository.save({
      user_id: userId,
      ...settings,
    });
  }

  async updateSettings(
    userId: number,
    updates: Partial<UserNotificationSettings>,
  ): Promise<UserNotificationSettings> {
    const settings = await this.findByUserId(userId);
    if (!settings) {
      throw new Error(`Settings not found for user ${userId}`);
    }

    Object.assign(settings, updates);
    return await this.settingsRepository.save(settings);
  }
}

