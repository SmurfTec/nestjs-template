import { CommissionRateModel, UpdateCommissionRateModel } from '../../domain/models/commissionrate';
import { CommissionRateRepository } from '../../infrastructure/repository/commissionrate.repository';
export declare class CommissionRateUseCases {
    private readonly commissionRateRepository;
    constructor(commissionRateRepository: CommissionRateRepository);
    createCommissionRate(commissionRateModel: CommissionRateModel): Promise<import("../../domain/models/commissionrate").FetchCommissionRateModel>;
    getCommissionRate(id: number): Promise<{
        data: import("../../domain/models/commissionrate").FetchCommissionRateModel;
    }>;
    getCommissionRates(): Promise<import("../../domain/models/commissionrate").FetchCommissionRateModel[]>;
    updateCommissionRate(id: number, commissionRateUpdateModel: UpdateCommissionRateModel): Promise<import("../../domain/models/commissionrate").FetchCommissionRateModel>;
    deleteCommissionRate(id: number): Promise<void>;
}
