import { AppModulesUseCases } from '../../../usecases/app_module/app_module.usecases';
import { CreateAppModuleDto, UpdateAppModuleDto } from './app_module.dto';
export declare class AppModuleController {
    private readonly appModuleUseCases;
    constructor(appModuleUseCases: AppModulesUseCases);
    createAppModule(appModule: CreateAppModuleDto): any;
    getAppModule(id: number): any;
    getAppModules(): any;
    updateAppModule(id: number, appModule: UpdateAppModuleDto): any;
    deleteAppModule(id: number): any;
}
