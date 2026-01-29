import { Injectable } from '@nestjs/common';
import { OnboardingRepository } from '../../infrastructure/repository/onboarding.repository';
import { AuditRepository } from '../../infrastructure/repository/audit.repository';
import { FetchOnboardingModel } from '../../domain/models/onboarding';
import { AuditEventType } from '../../domain/models/audit';

@Injectable()
export class OnboardingCompletionUsecase {
  constructor(
    private readonly onboardingRepository: OnboardingRepository,
    private readonly auditRepository: AuditRepository,
  ) {}

  async execute(
    userId: number,
    ipAddress?: string,
    userAgent?: string
  ): Promise<FetchOnboardingModel> {
    // Complete onboarding
    const onboarding = await this.onboardingRepository.complete(userId);

    // Log audit event
    await this.auditRepository.createEvent({
      userId,
      eventType: AuditEventType.ONBOARDING_COMPLETED,
      eventData: { 
        type: AuditEventType.ONBOARDING_COMPLETED 
      },
      ipAddress,
      userAgent,
      timestamp: new Date(),
    });

    return onboarding;
  }
}
