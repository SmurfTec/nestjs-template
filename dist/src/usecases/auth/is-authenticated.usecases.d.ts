import { UserRepository } from '../../infrastructure/repository/user.repository';
import { UserWithoutPassword } from '../../domain/models/user';
export declare class IsAuthenticatedUseCases {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(email: string): Promise<UserWithoutPassword>;
}
