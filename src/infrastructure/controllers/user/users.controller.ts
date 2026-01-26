import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../infrastructure/common/guards/jwtAuth.guard';
import { RoleGuard } from '../../../infrastructure/common/guards/role.guard';
import { UserUseCases } from '../../../usecases/user/users.usecases';
import { UpdateUserDto } from './users.dto';
import { SuccessResponseDto } from '../common/response.dto';
import { ApiResponse } from 'src/domain/models/common-response';
import { FetchUserModel } from 'src/domain/models/users';
import { ResponseService } from 'src/infrastructure/common/services/response.service';
import { ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';

@Controller('/users')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UserController {
  constructor(private readonly userUseCases: UserUseCases, private readonly responseService: ResponseService) {}

  @Get(':id')
  @SwaggerApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: SuccessResponseDto,
  })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<FetchUserModel>> {
    const response: { data: FetchUserModel } = await this.userUseCases.getUser(id);
    return this.responseService.success(response.data, 'User retrieved successfully');
  }

  @Get()
  @SwaggerApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: SuccessResponseDto,
  })
  async getUsers(): Promise<ApiResponse<FetchUserModel[]>> {
    const response: FetchUserModel[] = await this.userUseCases.getUsers();
    return this.responseService.success(response, 'Users retrieved successfully');
  }

  @Put(':id')
  @SwaggerApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: SuccessResponseDto,
  })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<ApiResponse<FetchUserModel>> {
    const response: FetchUserModel = await this.userUseCases.updateUser(id, user);
    return this.responseService.success(response, 'User updated successfully');
  }
  
  @Delete(':id')
  @SwaggerApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: SuccessResponseDto,
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    await this.userUseCases.deleteUser(id);
    return this.responseService.deleted('User deleted successfully');
  }
}
