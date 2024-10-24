import { AppModulePermissionsModel } from '../models/app_module_permissions';
export interface IAppModulePermissions {
    createAppModulePermission(AppModulePermissionModel: AppModulePermissionsModel): Promise<AppModulePermissionsModel>;
    getAppModulePermission(id: number): Promise<AppModulePermissionsModel>;
    getAppModulePermissions(): Promise<AppModulePermissionsModel[]>;
    updateAppModulePermission(id: number, updateAppModulePermissionModel: AppModulePermissionsModel): Promise<AppModulePermissionsModel>;
    deleteAppModulePermission(id: number): Promise<void>;
}
