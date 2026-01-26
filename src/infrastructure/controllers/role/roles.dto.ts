import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  description: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  is_active: boolean;
}

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  is_active: boolean;
}
