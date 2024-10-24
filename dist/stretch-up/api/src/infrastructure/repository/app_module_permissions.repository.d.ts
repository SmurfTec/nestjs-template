import { Repository } from 'typeorm';
import { AppModulePermissionsModel, AppModulePermissionsUpdateModel } from 'src/domain/models/app_module_permissions';
import { IAppModulePermissions } from 'src/domain/repositories/app_module_permissions.repository.interface';
import { AppModulePermissions } from '../entities/app_module_permissions.entity';
export declare class AppModulePermissionsRepository implements IAppModulePermissions {
    private appModulePermissionsRepository;
    constructor(appModulePermissionsRepository: Repository<AppModulePermissions>);
    createAppModulePermission(appModulePermissionsModel: AppModulePermissionsModel): Promise<AppModulePermissionsModel>;
    getAppModulePermission(id: number): Promise<AppModulePermissionsModel>;
    getAppModulePermissions(): Promise<AppModulePermissionsModel[]>;
    getAppModulePermissionsWithoutRelations(): Promise<AppModulePermissionsModel[]>;
    updateAppModulePermission(id: number, updateAppModulePermissionModel: AppModulePermissionsUpdateModel): Promise<AppModulePermissionsModel>;
    deleteAppModulePermission(id: number): Promise<void>;
}
