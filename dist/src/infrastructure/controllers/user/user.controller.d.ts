import { AuthorizationUseCases } from 'src/usecases/auth/authorization.usecases';
import { LoginUseCases } from './../../../usecases/auth/login.usecases';
import { UpdateProfileDto } from './../profile/profile.dto';
import { UserUseCases } from '../../../usecases/user/user.usecases';
import { CreateUserDto, UpdateUserDto, banUserDto, CreateAdminDto } from './user.dto';
import { ProfilesUseCases } from 'src/usecases/profile/profile.usecases';
import { MailService } from 'src/infrastructure/services/emails/email.service';
import { PermissionsUseCases } from 'src/usecases/auth/permission.usecases';
export declare class UserController {
    private readonly userUseCases;
    private readonly profileUseCases;
    private readonly loginUsecaseProxy;
    private readonly authorizationUseCases;
    private emailService;
    private permissionUsecase;
    constructor(userUseCases: UserUseCases, profileUseCases: ProfilesUseCases, loginUsecaseProxy: LoginUseCases, authorizationUseCases: AuthorizationUseCases, emailService: MailService, permissionUsecase: PermissionsUseCases);
    createUser(user: CreateUserDto, req: any, res: any, next: any): Promise<void>;
    createUserWithRole(user: CreateAdminDto, req: any, res: any, next: any): Promise<void>;
    getMe(req: any, res: any, next: any): Promise<any>;
    getUser(id: number, req: any, res: any, next: any): Promise<any>;
    getUserStats(req: any, res: any, next: any): Promise<any>;
    getLoggenInUser(req: any, res: any, next: any): Promise<any>;
    banUsers(body: banUserDto, req: any, res: any, next: any): Promise<any>;
    unbanUsers(body: banUserDto, req: any, res: any, next: any): Promise<any>;
    deleteUsers(body: banUserDto, req: any, res: any, next: any): Promise<any>;
    getUsers(query: any, req: any, res: any, next: any): Promise<any>;
    randomIntFromInterval(min: any, max: any): number;
    updateMe(body: UpdateProfileDto, req: any, res: any, next: any): Promise<any>;
    updateUser(id: number, user: UpdateUserDto, req: any, res: any, next: any): Promise<any>;
}