import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/users.repository';
import { BcryptService } from '../../infrastructure/services/bcrypt/bcrypt.service';
import { CacheService } from '../../infrastructure/common/caching/cache.service';
import { CacheEnums } from '../../infrastructure/common/enums/cache.enums';

@Injectable()
export class CredentialsUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly cacheService: CacheService,
  ) {}

  async updatePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
    signOutAllDevices: boolean = false,
  ) {
    // Get user
    const user = await this.userRepository.getUser(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Verify current password
    const isPasswordValid = await this.bcryptService.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Check if new password is the same as current password
    const isSamePassword = await this.bcryptService.compare(
      newPassword,
      user.password,
    );

    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from current password',
      );
    }

    // Hash new password
    const hashedPassword = await this.bcryptService.hash(newPassword);

    // Update password
    await this.userRepository.updateUser(userId, { password: hashedPassword });

    // If sign out all devices is enabled, invalidate refresh token
    if (signOutAllDevices) {
      await this.userRepository.updateRefreshToken(user.email, null);
      await this.cacheService.delete(
        CacheEnums.INCORRECT_LOGIN + user.email,
      );
    }

    return {
      message: 'Password updated successfully',
      all_devices_signed_out: signOutAllDevices,
    };
  }
}

