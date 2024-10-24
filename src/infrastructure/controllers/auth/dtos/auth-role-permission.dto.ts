import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class AuthRolePermissionDto {
  @ApiProperty({ required: true })
  @ArrayNotEmpty()
  @IsArray()
  permissions: string[];
}
