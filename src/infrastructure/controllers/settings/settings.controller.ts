import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { UserData } from '../../common/user.data';
import { ResponseService } from '../../common/services/response.service';
import {
  SuccessResponseDto,
  UpdatedResponseDto,
  BadRequestResponseDto,
  NotFoundResponseDto,
} from '../common/response.dto';
import { UpdateProfileDto, ProfileResponseDto } from './settings.dto';
import { ProfileUseCases } from '../../../usecases/profile/profiles.usecases';
import { NotificationPreferencesUseCases } from '../../../usecases/settings/notification-preferences.usecases';
import { CredentialsUseCases } from '../../../usecases/settings/credentials.usecases';
import { UserRepository } from '../../repository/users.repository';
import { S3Service } from '../../services/s3/s3.service';
import {
  UpdateNotificationPreferencesDto,
  NotificationPreferencesResponseDto,
  UpdateCredentialsDto,
  CredentialsUpdateResponseDto,
  Enable2FADto,
  TwoFactorAuthStatusDto,
  TwoFactorAuthSetupResponseDto,
} from './settings.dto';
import { TwoFactorAuthUseCases } from '../../../usecases/settings/two-factor-auth.usecases';

@Controller('/settings')
@ApiTags('Settings')
@ApiBearerAuth('authorization')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(
    private readonly profileUseCases: ProfileUseCases,
    private readonly notificationPreferencesUseCases: NotificationPreferencesUseCases,
    private readonly credentialsUseCases: CredentialsUseCases,
    private readonly twoFactorAuthUseCases: TwoFactorAuthUseCases,
    private readonly userRepository: UserRepository,
    private readonly responseService: ResponseService,
    private readonly s3Service: S3Service,
  ) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user profile', description: 'Returns the authenticated user profile details' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 404,
    description: 'Profile not found',
    type: NotFoundResponseDto,
  })
  async getProfile(): Promise<any> {
    const userData = UserData.getUserData();
    const userId = +userData.id;

    // Get user with profile details
    const user = await this.userRepository.getUserByEmail(userData.email);
    if (!user || !user.profile) {
      return this.responseService.notFound('Profile not found');
    }

    // Format response with user email
    const profileData: ProfileResponseDto = {
      id: user.profile.id,
      name: user.profile.name,
      email: user.email, // Email is read-only from user table
      phone: user.profile.mobile || undefined,
      companyRole: undefined, // Not in current schema
      avatar: user.profile.image_path || undefined,
      created_on: user.profile.created_on,
      updated_on: user.profile.updated_on,
    };

    return this.responseService.success(profileData, 'Profile retrieved successfully');
  }

  @Put('profile')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({ summary: 'Update user profile', description: 'Updates the authenticated user profile details. Supports avatar upload via S3.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProfileDto })
  @SwaggerApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: UpdatedResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid request or email already in use',
    type: BadRequestResponseDto,
  })
  @SwaggerApiResponse({
    status: 404,
    description: 'Profile not found',
    type: NotFoundResponseDto,
  })
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() avatarFile?: Express.Multer.File,
  ): Promise<any> {
    const userData = UserData.getUserData();
    const userId = +userData.id;

    // Get current user with profile
    const user = await this.userRepository.getUserByEmail(userData.email);
    if (!user) {
      return this.responseService.notFound('Profile not found');
    }

    // If email is being changed, initiate email verification process
    if (updateProfileDto.email && updateProfileDto.email !== user.email) {
      return this.responseService.badRequest(
        'Email change requires verification. Please use the dedicated email update endpoint.',
      );
    }

    let avatarUrl: string | undefined;

    // Handle avatar upload if file is provided
    if (avatarFile) {
      try {
        const uploadResult = await this.s3Service.uploadFile(avatarFile, 'avatars');
        avatarUrl = uploadResult.url;
      } catch (error) {
        return this.responseService.badRequest(`Failed to upload avatar: ${error.message}`);
      }
    }

    // Update profile fields (excluding email which is handled separately)
    const profileUpdate = {
      ...(updateProfileDto.name && { name: updateProfileDto.name }),
      ...(updateProfileDto.phone && { mobile: updateProfileDto.phone }),
      ...(avatarUrl && { image_path: avatarUrl }),
    };

    // Update profile
    const updatedProfile = await this.profileUseCases.updateProfile(
      user.profile.id,
      profileUpdate,
    );

    // Format response
    const profileData: ProfileResponseDto = {
      id: updatedProfile.id,
      name: updatedProfile.name,
      email: user.email, // Email remains unchanged from user table
      phone: updatedProfile.mobile || undefined,
      companyRole: undefined,
      avatar: updatedProfile.image_path || undefined,
      created_on: updatedProfile.created_on,
      updated_on: updatedProfile.updated_on,
    };

    return this.responseService.updated(profileData, 'Profile updated successfully');
  }

  @Get('notifications')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get notification preferences',
    description: 'Returns the notification preferences for the authenticated user',
  })
  @SwaggerApiResponse({
    status: 200,
    description: 'Notification preferences retrieved successfully',
    type: SuccessResponseDto,
  })
  async getNotificationPreferences(): Promise<any> {
    const userData = UserData.getUserData();
    const userId = +userData.id;

    const result = await this.notificationPreferencesUseCases.getPreferences(
      userId,
    );
    const preferences = result.data as NotificationPreferencesResponseDto;

    return this.responseService.success(
      preferences,
      'Notification preferences retrieved successfully',
    );
  }

  @Put('notifications')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update notification preferences',
    description: 'Updates the notification preferences for the authenticated user',
  })
  @ApiBody({ type: UpdateNotificationPreferencesDto })
  @SwaggerApiResponse({
    status: 200,
    description: 'Notification preferences updated successfully',
    type: UpdatedResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid request',
    type: BadRequestResponseDto,
  })
  async updateNotificationPreferences(
    @Body() updatePreferencesDto: UpdateNotificationPreferencesDto,
  ): Promise<any> {
    const userData = UserData.getUserData();
    const userId = +userData.id;

    // Update preferences
    const updatedPreferences =
      await this.notificationPreferencesUseCases.updatePreferences(
        userId,
        updatePreferencesDto,
      );

    return this.responseService.updated(
      updatedPreferences,
      'Notification preferences updated successfully',
    );
  }

  @Post('credentials/update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update user credentials',
    description: 'Allows users to securely update their password with current password verification and optional sign out of all devices',
  })
  @ApiBody({ type: UpdateCredentialsDto })
  @SwaggerApiResponse({
    status: 200,
    description: 'Credentials updated successfully',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid request or incorrect current password',
    type: BadRequestResponseDto,
  })
  async updateCredentials(@Body() updateCredentialsDto: UpdateCredentialsDto): Promise<any> {
    const userData = UserData.getUserData();
    const userId = +userData.id;

    const result = await this.credentialsUseCases.updatePassword(
      userId,
      updateCredentialsDto.current_password,
      updateCredentialsDto.new_password,
      updateCredentialsDto.sign_out_all_devices || false,
    );

    return this.responseService.success(
      result as CredentialsUpdateResponseDto,
      result.message,
    );
  }

  @Get('2fa')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get 2FA status',
    description: 'Returns the 2FA status and recovery codes if available',
  })
  @SwaggerApiResponse({
    status: 200,
    description: '2FA status retrieved successfully',
    type: SuccessResponseDto,
  })
  async get2FAStatus(): Promise<any> {
    const userData = UserData.getUserData();
    const userId = +userData.id;

    const status = await this.twoFactorAuthUseCases.getTwoFactorAuthStatus(
      userId,
    );

    return this.responseService.success(
      status as TwoFactorAuthStatusDto,
      '2FA status retrieved successfully',
    );
  }

  @Post('2fa/setup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Setup 2FA',
    description: 'Generates QR code and recovery codes for 2FA setup. User must scan QR code and then call /enable with the token.',
  })
  @SwaggerApiResponse({
    status: 201,
    description: '2FA setup completed, QR code returned',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: '2FA already enabled or setup in progress',
    type: BadRequestResponseDto,
  })
  async setup2FA(): Promise<any> {
    const userData = UserData.getUserData();
    const userId = +userData.id;
    const user = await this.userRepository.getUserByEmail(userData.email);

    // Generate secret and QR code
    const setupData = await this.twoFactorAuthUseCases.generateSecretAndQR(
      userId,
      user.email,
    );

    return this.responseService.created(
      {
        secret: setupData.secret,
        qrCode: setupData.qrCode,
        recovery_codes: setupData.recovery_codes,
      } as TwoFactorAuthSetupResponseDto,
      'Scan the QR code with your authenticator app, then enter the code to enable 2FA',
    );
  }

  @Post('2fa/enable')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Enable 2FA',
    description: 'Enables 2FA after verifying the OTP token from authenticator app. Call /setup first to get QR code.',
  })
  @ApiBody({ type: Enable2FADto })
  @SwaggerApiResponse({
    status: 200,
    description: '2FA enabled successfully',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid token or 2FA not setup',
    type: BadRequestResponseDto,
  })
  async enable2FA(@Body() enable2FADto: Enable2FADto): Promise<any> {
    const userData = UserData.getUserData();
    const userId = +userData.id;

    // Verify token and enable 2FA
    const result = await this.twoFactorAuthUseCases.enableTwoFactor(
      userId,
      enable2FADto.token,
    );

    return this.responseService.updated(
      result,
      '2FA enabled successfully',
    );
  }

  @Delete('2fa/disable')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Disable 2FA',
    description: 'Disables 2FA for the authenticated user',
  })
  @SwaggerApiResponse({
    status: 200,
    description: '2FA disabled successfully',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: '2FA is not enabled',
    type: BadRequestResponseDto,
  })
  async disable2FA(): Promise<any> {
    const userData = UserData.getUserData();
    const userId = +userData.id;

    const result = await this.twoFactorAuthUseCases.disableTwoFactor(userId);

    return this.responseService.success(
      result,
      result.message,
    );
  }
}

