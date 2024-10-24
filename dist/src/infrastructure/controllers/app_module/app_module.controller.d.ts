import { AppModulesUseCases } from '../../../usecases/app_module/app_module.usecases';
import { CreateAppModuleDto, UpdateAppModuleDto } from './app_module.dto';
export declare class AppModuleController {
    private readonly appModuleUseCases;
    constructor(appModuleUseCases: AppModulesUseCases);
    createAppModule(appModule: CreateAppModuleDto): Promise<{
        data: {
            permissions: any[];
            name: string;
            description: string;
        };
    }>;
    getAppModule(id: number): Promise<{
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
    updateAppModule(id: number, appModule: UpdateAppModuleDto): Promise<import("../../../domain/models/app_module").AppModuleModel>;
    deleteAppModule(id: number): Promise<void>;
}
