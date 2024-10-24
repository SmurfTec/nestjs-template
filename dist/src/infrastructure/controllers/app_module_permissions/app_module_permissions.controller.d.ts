import { AppModulePermissionsUseCases } from '../../../usecases/app_module_permissions/app_module_permissions.usecases';
import { CreateAppModulePermissionDto, UpdateAppModulePermissionDto } from './app_module_permissions.dto';
export declare class AppModulePermissionController {
    private readonly appModulePermissionUseCases;
    constructor(appModulePermissionUseCases: AppModulePermissionsUseCases);
    createAppModulePermission(appModulePermission: CreateAppModulePermissionDto): Promise<{
        data: import("../../../domain/models/app_module_permissions").AppModulePermissionsModel;
    }>;
    getAppModulePermission(id: number): Promise<{
        data: import("../../../domain/models/app_module_permissions").AppModulePermissionsModel;
    }>;
    getAppModulePermissions(): Promise<{
        data: import("../../../domain/models/app_module_permissions").AppModulePermissionsModel[];
    }>;
    updateAppModulePermission(id: number, appModulePermission: UpdateAppModulePermissionDto): Promise<import("../../../domain/models/app_module_permissions").AppModulePermissionsModel>;
    deleteAppModulePermission(id: number): Promise<void>;
}
