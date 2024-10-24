import { Injectable } from '@nestjs/common';
import {
  UserModel,
  UserWithoutPassword,
} from '../../../../../upfront/src/domain/models/user';

@Injectable()
export class IsAuthenticatedUseCases {
  // constructor(private readonly userRepository: UserRepository) {}
  // async execute(email: string): Promise<UserWithoutPassword> {
  //   const user: UserModel = await this.userRepository.getUserByEmail(email);
  //   const { password, ...info } = user;
  //   return info;
  // }
}
