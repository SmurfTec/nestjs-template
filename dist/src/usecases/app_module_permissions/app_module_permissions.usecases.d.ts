import { AppModulePermissionsModel, AppModulePermissionsUpdateModel } from '../../domain/models/app_module_permissions';
import { AppModulePermissionsRepository } from '../../infrastructure/repository/app_module_permissions.repository';
export declare class AppModulePermissionsUseCases {
    private readonly appModulePermissionsRepository;
    constructor(appModulePermissionsRepository: AppModulePermissionsRepository);
    createAppModulePermission(appModulePermissionModel: AppModulePermissionsModel): Promise<{
        data: AppModulePermissionsModel;
    }>;
    getAppModulePermission(id: number): Promise<{
        data: AppModulePermissionsModel;
    }>;
    getAppModulePermissions(): Promise<{
        data: AppModulePermissionsModel[];
    }>;
    updateAppModulePermission(id: number, appModulePermissionUpdateModel: AppModulePermissionsUpdateModel): Promise<AppModulePermissionsModel>;
    deleteAppModulePermission(id: number): Promise<void>;
}
