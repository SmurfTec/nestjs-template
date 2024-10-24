import { AppModuleModel } from '../../domain/models/app_module';
import { AppModulesRepository } from '../../infrastructure/repository/app_module.repository';
import { AuthPermissionsRepository } from '../../infrastructure/repository/auth-permissions.repository';
export declare class AppModulesUseCases {
    private readonly appModulesRepository;
    private readonly authPermissionsRepository;
    constructor(appModulesRepository: AppModulesRepository, authPermissionsRepository: AuthPermissionsRepository);
    createAppModule(appModuleModel: AppModuleModel): Promise<{
        data: any;
    }>;
    getAppModule(id: number): Promise<{
        data: any;
    }>;
    getAppModulePermissions(id: number): Promise<{
        data: any;
    }>;
    getAppModules(): Promise<{
        data: any[];
    }>;
    updateAppModule(id: number, appModuleUpdateModel: AppModuleModel): Promise<any>;
    deleteAppModule(id: number): Promise<any>;
}
