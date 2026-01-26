import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ProfileModel, UpdateProfileModel } from '../../domain/models/profiles';
import { ProfileRepository } from '../../infrastructure/repository/profiles.repository';
import { UserRepository } from '../../infrastructure/repository/users.repository';
import { CacheService } from '../../infrastructure/common/caching/cache.service';
import { MailService } from '../../infrastructure/emails/email.service';
import { generateOTP } from '../../infrastructure/util/utility-functions';
import { UpdateProfileDto } from 'src/infrastructure/controllers/profile/profiles.dto';

@Injectable()
export class ProfileUseCases {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
    private readonly mailService: MailService,
  ) {}

  async createProfile(profileModel: ProfileModel) {
    return await this.profileRepository.createProfile(profileModel);
  }

  async getProfile(id: number) {
    const data = await this.profileRepository.getProfile(id);
    if (!data) {
      throw new HttpException('Profile Not Found', HttpStatus.NOT_FOUND);
    }
    return { data };
  }

  async getProfiles() {
    return await this.profileRepository.getProfiles();
  }

  async updateProfile(id: number, profileUpdateModel: UpdateProfileDto) {
    const updatedProfile = await this.profileRepository.updateProfile(
      id,
      profileUpdateModel,
    );

    // Invalidate cache after profile update
    await this.cacheService.delete(`profile:${id}`);

    return updatedProfile;
  }

  async initiateEmailChangeVerification(
    userId: number,
    newEmail: string,
    currentEmail: string,
  ) {
    // Check if new email is already in use
    const existingUser = await this.userRepository.getUserByEmail(newEmail);
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    // Generate OTP
    const code = generateOTP();

    // Store OTP in cache with user ID as key (expires in 15 minutes)
    await this.cacheService.set(`email_change:${userId}`, { code, newEmail }, 15 * 60 * 1000);

    // Send verification email to current email
    await this.mailService.sendEmailUpdateVerificationEmail(currentEmail, code);

    return { message: 'Verification code sent to your current email' };
  }

  async verifyEmailChange(userId: number, code: string) {
    // Get the stored verification data
    const verificationData: any = await this.cacheService.get(`email_change:${userId}`);

    if (!verificationData || verificationData.code !== code) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    // Delete verification code
    await this.cacheService.delete(`email_change:${userId}`);

    return verificationData.newEmail;
  }

  async deleteProfile(id: number) {
    // Invalidate cache
    await this.cacheService.delete(`profile:${id}`);
    return await this.profileRepository.deleteProfile(id);
  }
}
