import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  AuthLoginDto,
  AuthSignUpDto,
  UpdatePasswordDto,
  InitiateEmailUpdateDto,
  VerifyEmailUpdateDto,
  AuthVerifyUserDto,
  ForgotPasswordDto,
  ResendOtpDto,
  ResetPasswordDto,
} from './auth-dto.class';
import { IsAuthPresenter } from './auth.presenter';

import JwtRefreshGuard from '../../common/guards/jwtRefresh.guard';
import { LoginGuard } from '../../common/guards/login.guard';
import { VerifyUserGuard } from '../../common/guards/verify-user.guard';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';
import { AllowUnAuthorizedRequest } from 'src/infrastructure/common/decorators/allow-unauthorized-reques.decorator';
import { Throttle, minutes } from '@nestjs/throttler';
import { UserUseCases } from 'src/usecases/user/users.usecases';
import { GoogleAuthGuard } from 'src/infrastructure/common/guards/googleAuth.gaurd';
import { AppleAuthGuard } from 'src/infrastructure/common/guards/appleAuth.gaurd';
import { ResponseService } from 'src/infrastructure/common/services/response.service';
import {
  SuccessResponseDto,
  CreatedResponseDto,
  UnauthorizedResponseDto,
  BadRequestResponseDto,
} from '../common/response.dto';

@Controller('/auth')
@ApiTags('auth')
@SwaggerApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@SwaggerApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    private readonly loginUsecaseProxy: LoginUseCases,
    private readonly logoutUsecaseProxy: LogoutUseCases,
    private readonly isAuthUsecaseProxy: IsAuthenticatedUseCases,
    private readonly userUseCases: UserUseCases,
    private readonly responseService: ResponseService,
  ) {}

  @Post('login')
  @Throttle({ default: { ttl: minutes(15), limit: 10 } })
  @AllowUnAuthorizedRequest()
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ 
    description: 'Login with optional 2FA support. If user has 2FA enabled, first call without twoFactorToken will return 401 with message "Two-factor authentication required". Then call again with twoFactorToken.' 
  })
  @SwaggerApiResponse({
    status: 200,
    description: 'Login successful',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 401,
    description: 'Invalid credentials or 2FA required',
    type: UnauthorizedResponseDto,
  })
  async login(@Body() auth: AuthLoginDto, @Request() request: any) {
    const accessToken = await this.loginUsecaseProxy.getJwtToken(auth.email);
    const refreshToken = await this.loginUsecaseProxy.getJwtRefreshToken(
      auth.email,
    );

    request.res.setHeader('Authorization', `Bearer ${accessToken}`);
    request.res.setHeader('x-refresh-token', refreshToken);
    
    const loginData = {
      ...request.user, 
      accessToken,
      refreshToken,
    };
    
    return this.responseService.success(loginData, 'Login successful');
  }

  @Get('google')
  @AllowUnAuthorizedRequest()
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Redirects to Google Sign-In
  }

  @Get('google/callback')
  @AllowUnAuthorizedRequest()
  @UseGuards(GoogleAuthGuard)
  @SwaggerApiResponse({
    status: 200,
    description: 'Google authentication successful',
    type: SuccessResponseDto,
  })
  async googleAuthRedirect(@Req() req) {
    const user = await this.userUseCases.socialSignIn(req.user);
    const accessToken = await this.loginUsecaseProxy.getJwtToken(user.email);
    const refreshToken = await this.loginUsecaseProxy.getJwtRefreshToken(
      user.email,
    );

    req.res.setHeader('Authorization', `Bearer ${accessToken}`);
    req.res.setHeader('x-refresh-token', refreshToken);
    req.user = user;

    return this.responseService.success(user, 'Google authentication successful');
  }

  @Get('apple')
  @AllowUnAuthorizedRequest()
  @UseGuards(AppleAuthGuard)
  async appleAuth() {
    // Redirects to Apple Sign-In
  }

  @Get('apple/callback')
  @AllowUnAuthorizedRequest()
  @UseGuards(AppleAuthGuard)
  @SwaggerApiResponse({
    status: 200,
    description: 'Apple authentication successful',
    type: SuccessResponseDto,
  })
  async appleAuthRedirect(@Req() req) {
    const user = await this.userUseCases.socialSignIn(req.user);
    const accessToken = await this.loginUsecaseProxy.getJwtToken(user.email);
    const refreshToken = await this.loginUsecaseProxy.getJwtRefreshToken(
      user.email,
    );

    req.res.setHeader('Authorization', `Bearer ${accessToken}`);
    req.res.setHeader('x-refresh-token', refreshToken);
    req.user = user;

    return this.responseService.success(user, 'Apple authentication successful');
  }

  @Post('signup')
  @ApiBearerAuth()
  @AllowUnAuthorizedRequest()
  @SwaggerApiResponse({
    status: 201,
    description: 'User signup successful',
    type: CreatedResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestResponseDto,
  })
  async SignUp(@Body() auth: AuthSignUpDto) {
    try {
      const user = await this.userUseCases.signUpUser({
        ...auth,
        mobile: auth.phone || null,
      });
      if (user) {
        const signupData = { message: 'Notification Send to email' };
        return this.responseService.created(signupData, 'User signup successful');
      } else {
        throw new HttpException(
          this.responseService.badRequest('Could not create new user'),
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        this.responseService.badRequest(e.message),
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('verify-user')
  @AllowUnAuthorizedRequest()
  @UseGuards(VerifyUserGuard)
  @ApiOperation({ description: 'verify-user' })
  @SwaggerApiResponse({
    status: 200,
    description: 'User verification successful',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid token',
    type: BadRequestResponseDto,
  })
  async verifyUser(@Body() _token: AuthVerifyUserDto, @Req() req) {
    const user = req.user?.user ?? req.user;
    if (!user) {
      return this.responseService.badRequest('User verification failed');
    }

    const accessToken = await this.loginUsecaseProxy.getJwtToken(user.email);
    const refreshToken = await this.loginUsecaseProxy.getJwtRefreshToken(
      user.email,
    );

    req.res.setHeader('Authorization', `Bearer ${accessToken}`);
    req.res.setHeader('x-refresh-token', refreshToken);
    
    const loginData = {
      ...req.user, 
      accessToken,
      refreshToken,
    };
    
    return this.responseService.success(loginData, 'Login successful');
  }

  @Post('verify-otp')
  @AllowUnAuthorizedRequest()
  @ApiOperation({ description: 'verify-otp' })
  @SwaggerApiResponse({
    status: 200,
    description: 'OTP verification successful',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid OTP',
    type: BadRequestResponseDto,
  })
  async getTokenFromCode(@Body() token: AuthVerifyUserDto) {
    const result = await this.userUseCases.getTokenFromCode(token.token);
    return this.responseService.success(result, 'OTP verification successful');
  }

  @Post('forgot-password')
  @AllowUnAuthorizedRequest()
  @ApiOperation({ description: 'forgot-password' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Password reset email sent',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid email',
    type: BadRequestResponseDto,
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.userUseCases.forgotPassword(forgotPasswordDto.email);
    return this.responseService.success(result, 'Password reset email sent');
  }

  @Post('resend-otp')
  @AllowUnAuthorizedRequest()
  @ApiOperation({ description: 'resend-otp' })
  @SwaggerApiResponse({
    status: 200,
    description: 'OTP resent successfully',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid email',
    type: BadRequestResponseDto,
  })
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    const result = await this.userUseCases.resendOtp(resendOtpDto.email);
    return this.responseService.success(result, 'OTP resent successfully');
  }

  @Put('set-password/:token')
  @AllowUnAuthorizedRequest()
  @SwaggerApiResponse({
    status: 200,
    description: 'Password set successfully',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid token or password',
    type: BadRequestResponseDto,
  })
  setEmployeePassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    const result = this.userUseCases.setUserPassword(token, resetPasswordDto.password);
    return this.responseService.success(result, 'Password set successfully');
  }

  @Post('initiate-email-update')
  @AllowUnAuthorizedRequest()
  @ApiOperation({ description: 'initiate-email-update' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Email update initiated',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid email',
    type: BadRequestResponseDto,
  })
  async initiateEmailUpdate(@Body() body: InitiateEmailUpdateDto) {
    const result = await this.userUseCases.initiateEmailUpdate(body.email);
    return this.responseService.success(result, 'Email update initiated');
  }

  @Post('verify-email-update')
  @AllowUnAuthorizedRequest()
  @ApiOperation({ description: 'verify-email-update' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Email update verified',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid OTP or email',
    type: BadRequestResponseDto,
  })
  async verifyEmailUpdate(@Body() body: VerifyEmailUpdateDto) {
    const result = await this.userUseCases.verifyEmailUpdate(body.otp, body.new_email);
    return this.responseService.success(result, 'Email update verified');
  }

  @Post('logout')
  @ApiOperation({ description: 'logout' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Logout successful',
    type: SuccessResponseDto,
  })
  async logout(@Request() request: any) {
    // const cookie = await this.logoutUsecaseProxy.execute();
    // request.res.setHeader('Set-Cookie', cookie);
    request.res.setHeader('Authorization', '');
    request.res.setHeader('x-refresh-token', '');
    return this.responseService.success(null, 'Logout successful');
  }

  @Get('is_authenticated')
  @ApiBearerAuth('authorization')
  @ApiOperation({ description: 'is_authenticated' })
  @SwaggerApiResponse({
    status: 200,
    description: 'User authentication status',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  async isAuthenticated(@Req() request: any) {
    const user = await this.isAuthUsecaseProxy.execute(request.user.email);
    const response = new IsAuthPresenter();
    response.email = user.email;
    return this.responseService.success(response, 'User authentication status retrieved');
  }

  @Post('is_authenticated')
  @ApiBearerAuth('authorization')
  @ApiOperation({ description: 'is_authenticated' })
  @SwaggerApiResponse({
    status: 200,
    description: 'User authentication status',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  async isAuthenticatedRequest(@Req() request: any) {
    const user = await this.isAuthUsecaseProxy.execute(request.user.email);
    const response = new IsAuthPresenter();
    response.email = user.email;
    return this.responseService.success(response, 'User authentication status retrieved');
  }

  @Patch('update-password')
  @ApiBearerAuth('authorization')
  @ApiOperation({ description: 'password update' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Password updated successfully',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Invalid current password',
    type: BadRequestResponseDto,
  })
  async updatePassword(@Body() body: UpdatePasswordDto) {
    const result = await this.loginUsecaseProxy.updatePassword(
      body.password,
      body.new_password,
    );
    return this.responseService.success(result, 'Password updated successfully');
  }

  @Get('refresh')
  @AllowUnAuthorizedRequest()
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth('authorization')
  @SwaggerApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: SuccessResponseDto,
  })
  @SwaggerApiResponse({
    status: 401,
    description: 'Invalid refresh token',
    type: UnauthorizedResponseDto,
  })
  async refresh(@Req() request: any) {
    const accessToken = await this.loginUsecaseProxy.getJwtToken(
      request.user.email,
    );
    const refreshToken = await this.loginUsecaseProxy.getJwtRefreshToken(
      request.user.email,
    );
    request.res.setHeader('Authorization', `Bearer ${accessToken}`);
    request.res.setHeader('x-refresh-token', refreshToken);
    return this.responseService.success(
      { accessToken, refreshToken },
      'Token refreshed successfully',
    );
  }
}
