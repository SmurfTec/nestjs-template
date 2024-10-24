import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class NestedAuthUserPermissionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  permissions: string;

  @ApiProperty({ required: true })
  @IsBoolean()
  is_allow = true;
}

export class AuthUserPermissionsDto {
  @ApiProperty({ required: true })
  @IsArray()
  permissions: string[];
}
