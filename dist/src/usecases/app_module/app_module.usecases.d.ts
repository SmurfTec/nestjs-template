import { AppModuleModel } from '../../domain/models/app_module';
import { AppModulesRepository } from '../../infrastructure/repository/app_module.repository';
import { AuthPermissionsRepository } from '../../infrastructure/repository/auth-permissions.repository';
export declare class AppModulesUseCases {
    private readonly appModulesRepository;
    private readonly authPermissionsRepository;
    constructor(appModulesRepository: AppModulesRepository, authPermissionsRepository: AuthPermissionsRepository);
    createAppModule(appModuleModel: AppModuleModel): Promise<{
        data: {
            permissions: any[];
            name: string;
            description: string;
        };
    }>;
    getAppModule(id: number): Promise<{
        data: import("../../domain/models/app_module").AppModuleFetchModel;
    }>;
    getAppModulePermissions(id: number): Promise<{
        data: {
            permissions: any[];
            id: number;
            name: string;
            description: string;
        };
    }>;
    getAppModules(): Promise<{
        data: any[];
    }>;
    updateAppModule(id: number, appModuleUpdateModel: AppModuleModel): Promise<AppModuleModel>;
    deleteAppModule(id: number): Promise<void>;
}
