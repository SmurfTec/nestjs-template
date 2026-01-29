import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  RoleModel,
  FetchRoleModel,
  UpdateRoleModel,
} from '../../domain/models/roles';
import { IRole } from '../../domain/repositories/roles.repository.interface';
import { Roles } from '../entities/roles.entity';

@Injectable()
export class RoleRepository implements IRole {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async createRole(roleModel: RoleModel): Promise<FetchRoleModel> {
    return await this.roleRepository.save(roleModel);
  }

  async getRole(id: number): Promise<FetchRoleModel> {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async getRoleByName(name: string): Promise<FetchRoleModel> {
    return await this.roleRepository.findOne({ where: { name } });
  }

  async getRoles(): Promise<FetchRoleModel[]> {
    return await this.roleRepository.find();
  }

  async updateRole(
    id: number,
    updateRoleModel: UpdateRoleModel,
  ): Promise<FetchRoleModel> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (role) {
      const updatedRole = { ...role, ...updateRoleModel };
      return this.roleRepository.save(updatedRole);
    }
    return;
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.delete(id);
    return;
  }
}
