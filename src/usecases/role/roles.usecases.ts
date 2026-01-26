import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleModel, UpdateRoleModel } from '../../domain/models/roles';
import { RoleRepository } from '../../infrastructure/repository/roles.repository';

@Injectable()
export class RoleUseCases {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(roleModel: RoleModel) {
    return await this.roleRepository.createRole(roleModel);
  }

  async getRole(id: number) {
    const data = await this.roleRepository.getRole(id);
    if (!data) {
      throw new HttpException('Role Not Found', HttpStatus.NOT_FOUND);
    }
    return { data };
  }

  async getRoles() {
    return await this.roleRepository.getRoles();
  }

  async updateRole(id: number, roleUpdateModel: UpdateRoleModel) {
    return await this.roleRepository.updateRole(id, roleUpdateModel);
  }

  async deleteRole(id: number) {
    return await this.roleRepository.deleteRole(id);
  }
}
