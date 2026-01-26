import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceToken, DevicePlatform } from '../entities/device-token.entity';

@Injectable()
export class DeviceTokenRepository {
  constructor(
    @InjectRepository(DeviceToken)
    private deviceTokenRepository: Repository<DeviceToken>,
  ) {}

  async create(token: Partial<DeviceToken>): Promise<DeviceToken> {
    return await this.deviceTokenRepository.save(token);
  }

  async findByUserId(userId: number): Promise<DeviceToken[]> {
    return await this.deviceTokenRepository.find({
      where: { user_id: userId, is_active: true },
    });
  }

  async findByToken(token: string): Promise<DeviceToken | null> {
    return await this.deviceTokenRepository.findOne({
      where: { token },
    });
  }

  async updateLastUsed(token: string): Promise<void> {
    await this.deviceTokenRepository.update(
      { token },
      { last_used_at: new Date() },
    );
  }

  async deactivateToken(token: string): Promise<void> {
    await this.deviceTokenRepository.update({ token }, { is_active: false });
  }

  async deactivateUserTokens(userId: number): Promise<void> {
    await this.deviceTokenRepository.update(
      { user_id: userId },
      { is_active: false },
    );
  }

  async upsertToken(
    userId: number,
    token: string,
    platform: DevicePlatform,
    deviceName?: string,
  ): Promise<DeviceToken> {
    const existing = await this.findByToken(token);
    
    if (existing) {
      existing.is_active = true;
      existing.last_used_at = new Date();
      if (deviceName) {
        existing.device_name = deviceName;
      }
      return await this.deviceTokenRepository.save(existing);
    }

    return await this.deviceTokenRepository.save({
      user_id: userId,
      token,
      platform,
      device_name: deviceName,
      is_active: true,
      last_used_at: new Date(),
    });
  }
}

