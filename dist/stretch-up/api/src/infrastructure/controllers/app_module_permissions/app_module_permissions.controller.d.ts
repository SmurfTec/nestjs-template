import { AppModulePermissionsUseCases } from '../../../usecases/app_module_permissions/app_module_permissions.usecases';
import { CreateAppModulePermissionDto, UpdateAppModulePermissionDto } from './app_module_permissions.dto';
export declare class AppModulePermissionController {
    private readonly appModulePermissionUseCases;
    constructor(appModulePermissionUseCases: AppModulePermissionsUseCases);
    createAppModulePermission(appModulePermission: CreateAppModulePermissionDto): any;
    getAppModulePermission(id: number): any;
    getAppModulePermissions(): any;
    updateAppModulePermission(id: number, appModulePermission: UpdateAppModulePermissionDto): any;
    deleteAppModulePermission(id: number): any;
}
