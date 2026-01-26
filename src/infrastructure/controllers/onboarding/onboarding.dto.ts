import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { OnboardingState } from "src/domain/models/onboarding";

export class PersonalDetailsDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    firstName: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    lastName: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    phone: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    country: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    address?: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    city?: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    state?: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    postalCode?: string;
}

export class OnboardingProgressDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    userId: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    state: OnboardingState;
    
    @IsObject()
    @IsOptional()
    @ApiProperty({ required: false })
    personalDetails?: PersonalDetailsDto;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    nextStep: string;
    
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    completedSteps: string[];
}

export class FetchOnboardingDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    id: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    userId: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    state: OnboardingState;
    
    @IsObject()
    @IsOptional()
    @ApiProperty({ required: false })
    personalDetails?: PersonalDetailsDto;
    
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    createdAt: Date;
    
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    updatedAt: Date;
}