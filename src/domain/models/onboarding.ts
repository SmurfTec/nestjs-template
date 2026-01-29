export enum OnboardingState {
  NOT_STARTED = 'not_started',
  PERSONAL_DRAFT = 'personal_draft',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  ABANDONED = 'abandoned',
  BLOCKED = 'blocked',
}

export class PersonalDetailsModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

export class OnboardingProgressModel {
  userId: number;
  state: OnboardingState;
  personalDetails?: PersonalDetailsModel;
  nextStep: string;
  completedSteps: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class FetchOnboardingModel {
  id: number;
  userId: number;
  state: OnboardingState;
  personalDetails?: PersonalDetailsModel;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateOnboardingModel {
  state?: OnboardingState;
  personalDetails?: PersonalDetailsModel;
}
