import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TwoFactorAuthModel,
  FetchTwoFactorAuthModel,
  UpdateTwoFactorAuthModel,
} from '../../domain/models/two-factor-auth';
import { ITwoFactorAuth } from '../../domain/repositories/two-factor-auth.repository.interface';
import { TwoFactorAuth } from '../entities/two-factor-auth.entity';

@Injectable()
export class TwoFactorAuthRepository implements ITwoFactorAuth {
  constructor(
    @InjectRepository(TwoFactorAuth)
    private twoFactorAuthRepository: Repository<TwoFactorAuth>,
  ) {}

  async createTwoFactorAuth(
    twoFactorModel: TwoFactorAuthModel,
  ): Promise<FetchTwoFactorAuthModel> {
    return await this.twoFactorAuthRepository.save(twoFactorModel);
  }

  async getTwoFactorAuthByUserId(
    userId: number,
  ): Promise<FetchTwoFactorAuthModel> {
    return await this.twoFactorAuthRepository.findOne({
      where: { user_id: userId },
    });
  }

  async updateTwoFactorAuth(
    userId: number,
    updateModel: UpdateTwoFactorAuthModel,
  ): Promise<FetchTwoFactorAuthModel> {
    const twoFactorAuth = await this.twoFactorAuthRepository.findOne({
      where: { user_id: userId },
    });

    if (twoFactorAuth) {
      const updated = { ...twoFactorAuth, ...updateModel };
      return this.twoFactorAuthRepository.save(updated);
    }

    return this.twoFactorAuthRepository.save({
      user_id: userId,
      ...updateModel,
    });
  }

  async deleteTwoFactorAuth(userId: number): Promise<void> {
    await this.twoFactorAuthRepository.delete({ user_id: userId });
    return;
  }
}

