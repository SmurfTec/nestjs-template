import { AppModuleFetchModel, AppModuleModel } from '../models/app_module';
export interface IAppModules {
    createAppModule(AppModuleModel: AppModuleModel): Promise<AppModuleModel>;
    getAppModule(id: number): Promise<AppModuleFetchModel>;
    getAppModules(): Promise<AppModuleFetchModel[]>;
    updateAppModule(id: number, updateAppModuleModel: AppModuleModel): Promise<AppModuleModel>;
    deleteAppModule(id: number): Promise<void>;
}
