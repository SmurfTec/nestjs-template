import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UserRoleModel,
  FetchUserRoleModel,
  UpdateUserRoleModel,
} from '../../domain/models/user-roles';
import { IUserRole } from '../../domain/repositories/user-roles.repository.interface';
import { UserRoles } from '../entities/user-roles.entity';

@Injectable()
export class UserRoleRepository implements IUserRole {
  constructor(
    @InjectRepository(UserRoles)
    private userRoleRepository: Repository<UserRoles>,
  ) {}

  async createUserRole(
    userRoleModel: UserRoleModel,
  ): Promise<FetchUserRoleModel> {
    return await this.userRoleRepository.save(userRoleModel);
  }

  async getUserRole(id: number): Promise<FetchUserRoleModel> {
    return await this.userRoleRepository.findOne({ where: { id } });
  }

  async getUserRoles(): Promise<FetchUserRoleModel[]> {
    return await this.userRoleRepository.find();
  }

  async getUserRolesByUserId(UserId: number): Promise<UserRoles[]> {
    return await this.userRoleRepository.find({
      where: { userIdData: { id: UserId } },
      relations: ['roleIdData'],
    });
  }

  async getUserRolesByRoleId(RoleId: number): Promise<FetchUserRoleModel[]> {
    return await this.userRoleRepository.find({
      where: { roleIdData: { id: RoleId } },
    });
  }

  async updateUserRole(
    id: number,
    updateUserRoleModel: UpdateUserRoleModel,
  ): Promise<FetchUserRoleModel> {
    const userRole = await this.userRoleRepository.findOne({ where: { id } });
    if (userRole) {
      const updatedUserRole = { ...userRole, ...updateUserRoleModel };
      return this.userRoleRepository.save(updatedUserRole);
    }
    return;
  }

  async deleteUserRole(id: number): Promise<void> {
    await this.userRoleRepository.delete(id);
    return;
  }
}
