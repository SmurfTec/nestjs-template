import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TwoFactorAuthRepository } from '../../infrastructure/repository/two-factor-auth.repository';
import { TwoFactorAuthService } from '../../infrastructure/services/2fa/2fa.service';
import { UserRepository } from '../../infrastructure/repository/users.repository';

@Injectable()
export class TwoFactorAuthUseCases {
  constructor(
    private readonly twoFactorAuthRepository: TwoFactorAuthRepository,
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async getTwoFactorAuthStatus(userId: number) {
    const twoFactorAuth = await this.twoFactorAuthRepository.getTwoFactorAuthByUserId(
      userId,
    );

    if (!twoFactorAuth) {
      return {
        is_enabled: false,
        recovery_codes: null,
      };
    }

    return {
      is_enabled: twoFactorAuth.is_enabled,
      recovery_codes: twoFactorAuth.recovery_codes,
    };
  }

  async generateSecretAndQR(userId: number, email: string) {
    // Check if 2FA is already enabled
    const existing = await this.twoFactorAuthRepository.getTwoFactorAuthByUserId(
      userId,
    );

    if (existing && existing.is_enabled) {
      throw new BadRequestException('2FA is already enabled for this user');
    }

    // Generate secret
    const secret = this.twoFactorAuthService.generateSecret(email);
    // Encrypt secret
    const encryptedSecret = this.twoFactorAuthService.encryptSecret(secret);
    // Generate QR code
    const qrCode = await this.twoFactorAuthService.generateQRCode(
      secret,
      email,
    );
    // Generate recovery codes
    const recoveryCodes = this.twoFactorAuthService.generateRecoveryCodes(8);
    const hashedRecoveryCodes = recoveryCodes.map((code) =>
      this.twoFactorAuthService.hashRecoveryCode(code),
    );

    // Save to database (not enabled yet, waiting for verification)
    await this.twoFactorAuthRepository.updateTwoFactorAuth(userId, {
      secret: encryptedSecret,
      is_enabled: false,
      recovery_codes: hashedRecoveryCodes,
    });

    return {
      secret: secret, // Return unencrypted for QR code
      qrCode,
      recovery_codes: recoveryCodes, // Return plain recovery codes for user to save
    };
  }

  async enableTwoFactor(userId: number, token: string) {
    const twoFactorAuth =
      await this.twoFactorAuthRepository.getTwoFactorAuthByUserId(userId);

    if (!twoFactorAuth || !twoFactorAuth.secret) {
      throw new BadRequestException(
        'No 2FA setup found. Please initiate 2FA setup first.',
      );
    }

    if (twoFactorAuth.is_enabled) {
      throw new BadRequestException('2FA is already enabled');
    }

    // Decrypt secret
    const decryptedSecret =
      this.twoFactorAuthService.decryptSecret(twoFactorAuth.secret);

    // Verify token
    const isValid = this.twoFactorAuthService.verifyToken(
      token,
      decryptedSecret,
    );

    if (!isValid) {
      throw new BadRequestException('Invalid verification code');
    }

    // Enable 2FA
    const updated = await this.twoFactorAuthRepository.updateTwoFactorAuth(
      userId,
      { is_enabled: true },
    );

    return {
      message: '2FA enabled successfully',
      is_enabled: updated.is_enabled,
    };
  }

  async disableTwoFactor(userId: number) {
    const twoFactorAuth =
      await this.twoFactorAuthRepository.getTwoFactorAuthByUserId(userId);

    if (!twoFactorAuth || !twoFactorAuth.is_enabled) {
      throw new BadRequestException('2FA is not enabled for this user');
    }

    // Delete 2FA
    await this.twoFactorAuthRepository.deleteTwoFactorAuth(userId);

    return {
      message: '2FA disabled successfully',
    };
  }

  async verifyTokenForLogin(userId: number, token: string): Promise<boolean> {
    const twoFactorAuth =
      await this.twoFactorAuthRepository.getTwoFactorAuthByUserId(userId);

    if (!twoFactorAuth || !twoFactorAuth.is_enabled) {
      return false;
    }

    // Decrypt secret
    const decryptedSecret =
      this.twoFactorAuthService.decryptSecret(twoFactorAuth.secret);

    // Verify token
    return this.twoFactorAuthService.verifyToken(token, decryptedSecret);
  }

  async verifyRecoveryCode(userId: number, code: string): Promise<boolean> {
    const twoFactorAuth =
      await this.twoFactorAuthRepository.getTwoFactorAuthByUserId(userId);

    if (!twoFactorAuth || !twoFactorAuth.is_enabled) {
      return false;
    }

    // Check if any recovery code matches
    const hashedCode = this.twoFactorAuthService.hashRecoveryCode(code);
    const isValid = twoFactorAuth.recovery_codes.some(
      (stored) => stored === hashedCode,
    );

    if (isValid) {
      // Remove the used recovery code
      const remainingCodes = twoFactorAuth.recovery_codes.filter(
        (stored) => stored !== hashedCode,
      );
      await this.twoFactorAuthRepository.updateTwoFactorAuth(userId, {
        recovery_codes: remainingCodes,
      });
    }

    return isValid;
  }
}

