import { IsBoolean, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  is_active: boolean;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  user_id: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  role_id: number;
}

export class UpdateUserRoleDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  is_active: boolean;
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  user_id: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  role_id: number;
}
