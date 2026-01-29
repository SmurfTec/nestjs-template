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
import { RoleUseCases } from '../../../usecases/role/roles.usecases';
import { CreateRoleDto, UpdateRoleDto } from './roles.dto';

@Controller('/roles')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleUseCases: RoleUseCases) {}

  @Post()
  createRole(@Body() role: CreateRoleDto) {
    return this.roleUseCases.createRole(role);
  }

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleUseCases.getRole(id);
  }

  @Get()
  getRoles() {
    return this.roleUseCases.getRoles();
  }

  @Put(':id')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: UpdateRoleDto,
  ) {
    return this.roleUseCases.updateRole(id, role);
  }

  @Delete(':id')
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleUseCases.deleteRole(id);
  }
}
