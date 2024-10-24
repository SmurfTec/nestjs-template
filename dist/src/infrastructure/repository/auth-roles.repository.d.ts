import { AuthRoleModel, UpdateRoleModel } from 'src/domain/models/authorization';
import { IAuthRoles } from 'src/domain/repositories/auth-roles.repository.interface';
import { AuthRoles } from '../entities/auth-roles.entity';
import { DeleteResult, Repository } from 'typeorm';
export declare class AuthRolesRepository implements IAuthRoles {
    private readonly authRolesRepository;
    constructor(authRolesRepository: Repository<AuthRoles>);
    createRole(authRoleModel: AuthRoleModel): Promise<AuthRoleModel>;
    getRoles(): Promise<AuthRoleModel[]>;
    getRole(name: string): Promise<AuthRoleModel[]>;
    deleteRole(role: string): Promise<DeleteResult>;
    updateRole(role: string, authRoleModel: UpdateRoleModel): Promise<AuthRoleModel>;
    getRoleByName(name: string): Promise<AuthRoleModel>;
}
