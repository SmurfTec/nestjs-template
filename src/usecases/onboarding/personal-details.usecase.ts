import { Injectable } from '@nestjs/common';
import { OnboardingRepository } from '../../infrastructure/repository/onboarding.repository';
import { AuditRepository } from '../../infrastructure/repository/audit.repository';
import { PersonalDetailsModel, FetchOnboardingModel } from '../../domain/models/onboarding';
import { AuditEventType } from '../../domain/models/audit';

@Injectable()
export class PersonalDetailsUsecase {
  constructor(
    private readonly onboardingRepository: OnboardingRepository,
    private readonly auditRepository: AuditRepository,
  ) {}

  async execute(
    userId: number, 
    personalDetails: PersonalDetailsModel,
    ipAddress?: string,
    userAgent?: string
  ): Promise<FetchOnboardingModel> {
    // Update personal details
    const onboarding = await this.onboardingRepository.updatePersonalDetails(userId, personalDetails);

    // Log audit event
    await this.auditRepository.createEvent({
      userId,
      eventType: AuditEventType.PERSONAL_DETAILS_SAVED,
      eventData: { 
        firstName: personalDetails.firstName,
        lastName: personalDetails.lastName,
        email: personalDetails.email,
        country: personalDetails.country 
      },
      ipAddress,
      userAgent,
      timestamp: new Date(),
    });

    return onboarding;
  }
}
