import { CommissionRateUseCases } from '../../../usecases/commissionrate/commissionrate.usecases';
import { CreateCommissionRateDto, UpdateCommissionRateDto } from './commissionrate.dto';
export declare class CommissionRateController {
    private readonly commissionRateUseCases;
    constructor(commissionRateUseCases: CommissionRateUseCases);
    createCommissionRate(commissionRate: CreateCommissionRateDto): Promise<import("../../../domain/models/commissionrate").FetchCommissionRateModel>;
    getCommissionRate(id: number): Promise<{
        data: import("../../../domain/models/commissionrate").FetchCommissionRateModel;
    }>;
    getCommissionRates(): Promise<import("../../../domain/models/commissionrate").FetchCommissionRateModel[]>;
    updateCommissionRate(id: number, commissionRate: UpdateCommissionRateDto): Promise<import("../../../domain/models/commissionrate").FetchCommissionRateModel>;
    deleteCommissionRate(id: number): Promise<void>;
}
