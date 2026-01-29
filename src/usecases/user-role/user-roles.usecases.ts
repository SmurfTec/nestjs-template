import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  UserRoleModel,
  UpdateUserRoleModel,
} from '../../domain/models/user-roles';
import { UserRoleRepository } from '../../infrastructure/repository/user-roles.repository';

@Injectable()
export class UserRoleUseCases {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  async createUserRole(userRoleModel: UserRoleModel) {
    return await this.userRoleRepository.createUserRole(userRoleModel);
  }

  async getUserRole(id: number) {
    const data = await this.userRoleRepository.getUserRole(id);
    if (!data) {
      throw new HttpException('UserRole Not Found', HttpStatus.NOT_FOUND);
    }
    return { data };
  }

  async getUserRoles() {
    return await this.userRoleRepository.getUserRoles();
  }

  async getUserRolesByUserId(UserId: number) {
    return await this.userRoleRepository.getUserRolesByUserId(UserId);
  }

  async getUserRolesByRoleId(RoleId: number) {
    return await this.userRoleRepository.getUserRolesByRoleId(RoleId);
  }

  async updateUserRole(id: number, userRoleUpdateModel: UpdateUserRoleModel) {
    return await this.userRoleRepository.updateUserRole(
      id,
      userRoleUpdateModel,
    );
  }

  async deleteUserRole(id: number) {
    return await this.userRoleRepository.deleteUserRole(id);
  }
}
