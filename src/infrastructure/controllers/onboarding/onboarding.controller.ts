import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Body, 
  Param, 
  Req,  
  UseGuards,
} from '@nestjs/common';
import { OnboardingProgressUsecase } from '../../../usecases/onboarding/onboarding-progress.usecase';
import { PersonalDetailsUsecase } from '../../../usecases/onboarding/personal-details.usecase';
import { OnboardingCompletionUsecase } from '../../../usecases/onboarding/onboarding-completion.usecase';
import { 
  PersonalDetailsDto,
  OnboardingProgressDto,
  FetchOnboardingDto 
} from './onboarding.dto';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { ApiBearerAuth, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { ResponseService } from 'src/infrastructure/common/services/response.service';
import { SuccessResponseDto } from '../common/response.dto';
import { ApiResponse } from 'src/domain/models/common-response';

@Controller('/onboarding')
export class OnboardingController {
  constructor(
    private readonly onboardingProgressUsecase: OnboardingProgressUsecase,
    private readonly personalDetailsUsecase: PersonalDetailsUsecase,
    private readonly onboardingCompletionUsecase: OnboardingCompletionUsecase,
    private readonly responseService: ResponseService,
  ) {}

  @Get(':userId/progress')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @SwaggerApiResponse({
    status: 200,
    description: 'Onboarding progress retrieved successfully',
    type: SuccessResponseDto,
  })
  async getProgress(@Param('userId') userId: number, @Req() req): Promise<ApiResponse<OnboardingProgressDto>> {
    const response: OnboardingProgressDto = await this.onboardingProgressUsecase.execute(userId);
    return this.responseService.success(response, 'Onboarding progress retrieved successfully');
  }

  @Put(':userId/personal')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @SwaggerApiResponse({
    status: 200,
    description: 'Onboarding personal details updated successfully',
    type: SuccessResponseDto,
  })
  async updatePersonalDetails(
    @Param('userId') userId: number,
    @Body() personalDetails: PersonalDetailsDto,
    @Req() req: any
  ): Promise<ApiResponse<FetchOnboardingDto>> {
    const response: FetchOnboardingDto = await this.personalDetailsUsecase.execute(
      userId,
      personalDetails,
      req.ip,
      req.get('User-Agent')
    );
    return this.responseService.success(response, 'Onboarding personal details updated successfully');
  }

  @Get(':userId/personal')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @SwaggerApiResponse({
    status: 200,
    description: 'Onboarding personal details retrieved successfully',
    type: SuccessResponseDto,
  })
  async getPersonalDetails(@Param('userId') userId: number): Promise<ApiResponse<PersonalDetailsDto>> {
    const progress = await this.onboardingProgressUsecase.execute(userId);
    return this.responseService.success(progress.personalDetails, 'Onboarding personal details retrieved successfully');
  }

  @Post('complete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @SwaggerApiResponse({
    status: 200,
    description: 'Onboarding completed successfully',
    type: SuccessResponseDto,
  })
  async completeOnboarding(
    @Req() req
  ): Promise<ApiResponse<FetchOnboardingDto>> {
    const response: FetchOnboardingDto = await this.onboardingCompletionUsecase.execute(
      req.user.id,
      req.ip,
      req.get('User-Agent')
    );
    return this.responseService.success(response, 'Onboarding completed successfully');
  }

  @Get('summary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @SwaggerApiResponse({
    status: 200,
    description: 'Onboarding summary retrieved successfully',
    type: SuccessResponseDto,
  })
  async getOnboardingSummary(@Req() req): Promise<ApiResponse<OnboardingProgressDto>> {
    const response: OnboardingProgressDto = await this.onboardingProgressUsecase.execute(req.user.id);
    return this.responseService.success(response, 'Onboarding summary retrieved successfully');
  }
}