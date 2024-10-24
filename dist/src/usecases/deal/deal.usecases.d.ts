import { DealModel, UpdateDealModel } from '../../domain/models/deal';
import { DealRepository } from '../../infrastructure/repository/deal.repository';
export declare class DealUseCases {
    private readonly dealRepository;
    constructor(dealRepository: DealRepository);
    createDeal(dealModel: DealModel): Promise<import("../../domain/models/deal").FetchDealModel>;
    getDeal(id: number): Promise<{
        data: import("../../domain/models/deal").FetchDealModel;
    }>;
    getDeals(): Promise<import("../../domain/models/deal").FetchDealModel[]>;
    updateDeal(id: number, dealUpdateModel: UpdateDealModel): Promise<import("../../domain/models/deal").FetchDealModel>;
    deleteDeal(id: number): Promise<void>;
}
