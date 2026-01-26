import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../infrastructure/common/guards/jwtAuth.guard';
import { UserRoleUseCases } from '../../../usecases/user-role/user-roles.usecases';
import { CreateUserRoleDto, UpdateUserRoleDto } from './user-roles.dto';

@Controller('/user-roles')
@UseGuards(JwtAuthGuard)
export class UserRoleController {
  constructor(private readonly userRoleUseCases: UserRoleUseCases) {}

  @Post()
  createUserRole(@Body() userRole: CreateUserRoleDto) {
    return this.userRoleUseCases.createUserRole(userRole);
  }

  @Get('user-id/:id')
  getUserRolesByUserId(@Param('id', ParseIntPipe) UserId: number) {
    return this.userRoleUseCases.getUserRolesByUserId(UserId);
  }

  @Get('role-id/:id')
  getUserRolesByRoleId(@Param('id', ParseIntPipe) RoleId: number) {
    return this.userRoleUseCases.getUserRolesByRoleId(RoleId);
  }

  @Get(':id')
  getUserRole(@Param('id', ParseIntPipe) id: number) {
    return this.userRoleUseCases.getUserRole(id);
  }

  @Get()
  getUserRoles() {
    return this.userRoleUseCases.getUserRoles();
  }

  @Put(':id')
  updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() userRole: UpdateUserRoleDto,
  ) {
    return this.userRoleUseCases.updateUserRole(id, userRole);
  }

  @Delete(':id')
  deleteUserRole(@Param('id', ParseIntPipe) id: number) {
    return this.userRoleUseCases.deleteUserRole(id);
  }
}
