import { Injectable } from '@nestjs/common';
import { OnboardingRepository } from '../../infrastructure/repository/onboarding.repository';
import { OnboardingProgressModel } from '../../domain/models/onboarding';

@Injectable()
export class OnboardingProgressUsecase {
  constructor(
    private readonly onboardingRepository: OnboardingRepository,
  ) {}

  async execute(userId: number): Promise<OnboardingProgressModel> {
    return await this.onboardingRepository.getProgress(userId);
  }
}
