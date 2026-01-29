import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Onboarding } from '../entities/onboarding.entity';
import { OnboardingRepositoryInterface } from '../../domain/repositories/onboarding.repository.interface';
import {
  PersonalDetailsModel,
  OnboardingProgressModel,
  FetchOnboardingModel,
  UpdateOnboardingModel,
  OnboardingState,
} from '../../domain/models/onboarding';

@Injectable()
export class OnboardingRepository implements OnboardingRepositoryInterface {
  constructor(
    @InjectRepository(Onboarding)
    private readonly onboardingRepository: Repository<Onboarding>,
  ) {}

  async updatePersonalDetails(userId: number, personalDetails: PersonalDetailsModel): Promise<FetchOnboardingModel> {
    const onboarding = await this.onboardingRepository.findOne({ where: { user_id: userId } });
    if (!onboarding) {
      throw new BadRequestException('Onboarding not found');
    }

    onboarding.personal_details = personalDetails;

    const saved = await this.onboardingRepository.save(onboarding);
    return this.mapToFetchModel(saved);
  }

  async getProgress(userId: number): Promise<OnboardingProgressModel> {
    const onboarding = await this.onboardingRepository.findOne({ 
      where: { user_id: userId } 
    });
    if (!onboarding) {
      throw new BadRequestException('Onboarding not found');
    }

    return {
      userId: onboarding.user_id,
      state: onboarding.state,
      personalDetails: onboarding.personal_details as PersonalDetailsModel,
      nextStep: this.getNextStep(onboarding.state),
      completedSteps: this.getCompletedSteps(onboarding.state),
      createdAt: onboarding.created_at,
      updatedAt: onboarding.updated_at,
    };
  }

  async getByUserId(userId: number): Promise<FetchOnboardingModel> {
    const onboarding = await this.onboardingRepository.findOne({ 
      where: { user_id: userId } 
    });

    if (!onboarding) {
      return null;
    }

    return this.mapToFetchModel(onboarding);
  }

  async update(userId: number, updateData: UpdateOnboardingModel): Promise<FetchOnboardingModel> {
    const onboarding = await this.onboardingRepository.findOne({ 
      where: { user_id: userId } 
    });
    if (!onboarding) {
      throw new BadRequestException('Onboarding not found');
    }
    
    const saved = await this.onboardingRepository.save(onboarding);
    return this.mapToFetchModel(saved);
  }

  async complete(userId: number): Promise<FetchOnboardingModel> {
    const onboarding = await this.onboardingRepository.findOne({ 
      where: { user_id: userId } 
    });
    if (!onboarding) {
      throw new BadRequestException('Onboarding not found');
    }

    onboarding.state = OnboardingState.COMPLETED;
    const saved = await this.onboardingRepository.save(onboarding);
    return this.mapToFetchModel(saved);
  }

  private mapToFetchModel(onboarding: Onboarding): FetchOnboardingModel {
    return {
      id: onboarding.id,
      userId: onboarding.user_id,
      state: onboarding.state,
      personalDetails: onboarding.personal_details as PersonalDetailsModel,
      createdAt: onboarding.created_at,
      updatedAt: onboarding.updated_at,
    };
  }

  private getNextStep(state: OnboardingState): string {
    switch (state) {
      case OnboardingState.NOT_STARTED:
        return 'personal_details';
      case OnboardingState.COMPLETED:
        return 'dashboard';
      default:
        return 'personal_details';
    }
  }

  private getCompletedSteps(state: OnboardingState): string[] {
    const steps = [];
    if (state !== OnboardingState.NOT_STARTED) steps.push('personal_details');
    if (state === OnboardingState.COMPLETED) {
      steps.push('complete');
    }
    return steps;
  }
}
