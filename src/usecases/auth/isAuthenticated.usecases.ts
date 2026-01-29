import { Injectable } from '@nestjs/common';
import { UserWithoutPassword, UserM } from 'src/domain/models/users';
import { UserRepository } from 'src/infrastructure/repository/users.repository';

@Injectable()
export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: UserRepository) {}

  async execute(email: string): Promise<UserWithoutPassword> {
    const user: UserM = await this.adminUserRepo.getUserByEmail(email);
    const { password, ...info } = user;
    return info;
  }
}
