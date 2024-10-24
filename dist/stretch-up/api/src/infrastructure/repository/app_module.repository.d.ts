import { Repository } from 'typeorm';
import { AppModuleFetchModel, AppModuleModel } from 'src/domain/models/app_module';
import { IAppModules } from 'src/domain/repositories/app_module.repository.interface';
import { AppModules } from '../entities/app_module.entity';
export declare class AppModulesRepository implements IAppModules {
    private appModulesRepository;
    constructor(appModulesRepository: Repository<AppModules>);
    createAppModule(appModulesModel: AppModuleModel): Promise<AppModuleModel>;
    getAppModule(id: number): Promise<AppModuleFetchModel>;
    getAppModules(): Promise<AppModuleFetchModel[]>;
    updateAppModule(id: number, updateAppModuleModel: AppModuleModel): Promise<AppModuleModel>;
    deleteAppModule(id: number): Promise<void>;
}
