import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UserModel,
  FetchUserModel,
  UpdateUserModel,
  UserM,
} from '../../domain/models/users';
import { IUser } from '../../domain/repositories/users.repository.interface';
import { Users } from '../entities/users.entity';
import { BcryptService } from '../services/bcrypt/bcrypt.service';

@Injectable()
export class UserRepository implements IUser {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private bcryptService: BcryptService,
  ) {}

  async createUser(userModel: UserModel): Promise<FetchUserModel> {
    return await this.userRepository.save(userModel);
  }

  async getUser(id: number): Promise<FetchUserModel> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async getUsers(): Promise<FetchUserModel[]> {
    return await this.userRepository.find({
    });
  }

  async updateUser(
    id: number,
    updateUserModel: UpdateUserModel,
  ): Promise<FetchUserModel> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (user) {
      const updatedUser = { ...user, ...updateUserModel };
      await this.userRepository.save(updatedUser);
      return updatedUser;
    }
    return;
  }

  async getActiveUserByEmail(email: string): Promise<UserModel> {
    return await this.userRepository.findOne({
      where: { email, is_active: true },
      relations: ['profile'],
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
    return;
  }

  async updateRefreshToken(email: string, refreshToken: string | null): Promise<void> {
    // hash the refresh token
    const hashedRefreshToken = await this.bcryptService.hash(refreshToken);
    await this.userRepository.update(
      {
        email,
      },
      { hach_refresh_token: hashedRefreshToken },
    );
  }

  async getUserByEmail(email: string): Promise<UserM> {
    const adminUserEntity = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['profile'],
    });
    if (!adminUserEntity) {
      return null;
    }
    return this.toUser(adminUserEntity);
  }
  async updateLastLogin(email: string): Promise<void> {
    await this.userRepository.update(
      {
        email,
      },
      { last_login: () => 'CURRENT_TIMESTAMP' },
    );
  }

  private toUser(adminUserEntity: Users): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity.id;
    adminUser.email = adminUserEntity.email;
    adminUser.password = adminUserEntity.password;
    adminUser.created_on = adminUserEntity.created_on;
    adminUser.updated_on = adminUserEntity.updated_on;
    adminUser.lastLogin = adminUserEntity.last_login;
    adminUser.hashRefreshToken = adminUserEntity.hach_refresh_token;
    adminUser.status = adminUserEntity.status;
    adminUser.is_active = adminUserEntity.is_active;
    adminUser.profile = adminUserEntity.profile;

    return adminUser;
  }

  private toUserEntity(adminUser: UserM): Users {
    const adminUserEntity: Users = new Users();

    adminUserEntity.email = adminUser.email;
    adminUserEntity.password = adminUser.password;
    adminUserEntity.last_login = adminUser.lastLogin;

    return adminUserEntity;
  }
}
