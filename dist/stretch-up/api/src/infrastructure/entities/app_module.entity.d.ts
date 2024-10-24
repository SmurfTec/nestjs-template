import { AppModulePermissions } from './app_module_permissions.entity';
export declare class AppModules {
    id: number;
    name: string;
    description: string;
    appModulePermissions: AppModulePermissions[];
    created_on: Date;
    updated_on: Date;
}
