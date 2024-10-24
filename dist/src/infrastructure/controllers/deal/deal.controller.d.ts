import { DealUseCases } from '../../../usecases/deal/deal.usecases';
import { CreateDealDto, UpdateDealDto } from './deal.dto';
export declare class DealController {
    private readonly dealUseCases;
    constructor(dealUseCases: DealUseCases);
    createDeal(deal: CreateDealDto): Promise<import("../../../domain/models/deal").FetchDealModel>;
    getDeal(id: number): Promise<{
        data: import("../../../domain/models/deal").FetchDealModel;
    }>;
    getDeals(): Promise<import("../../../domain/models/deal").FetchDealModel[]>;
    updateDeal(id: number, deal: UpdateDealDto): Promise<import("../../../domain/models/deal").FetchDealModel>;
    deleteDeal(id: number): Promise<void>;
}
