import { AppModulePermissionsModel, AppModulePermissionsUpdateModel } from '../../domain/models/app_module_permissions';
import { AppModulePermissionsRepository } from '../../infrastructure/repository/app_module_permissions.repository';
export declare class AppModulePermissionsUseCases {
    private readonly appModulePermissionsRepository;
    constructor(appModulePermissionsRepository: AppModulePermissionsRepository);
    createAppModulePermission(appModulePermissionModel: AppModulePermissionsModel): Promise<{
        data: any;
    }>;
    getAppModulePermission(id: number): Promise<{
        data: any;
    }>;
    getAppModulePermissions(): Promise<{
        data: any;
    }>;
    updateAppModulePermission(id: number, appModulePermissionUpdateModel: AppModulePermissionsUpdateModel): Promise<any>;
    deleteAppModulePermission(id: number): Promise<any>;
}
