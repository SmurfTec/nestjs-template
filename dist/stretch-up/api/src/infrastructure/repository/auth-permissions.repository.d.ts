import { AuthPermissionsModel } from 'src/domain/models/authorization';
import { IAuthPermissions } from 'src/domain/repositories/auth-permissions.repositoty.interface';
import { Repository } from 'typeorm';
import { AuthPermissions } from '../entities/auth-permissions.entity';
export declare class AuthPermissionsRepository implements IAuthPermissions {
    private readonly authPermissionsRepository;
    constructor(authPermissionsRepository: Repository<AuthPermissions>);
    getPermissions(): Promise<AuthPermissionsModel[]>;
}
