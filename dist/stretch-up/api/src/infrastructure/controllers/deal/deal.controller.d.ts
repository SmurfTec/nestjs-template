import { DealUseCases } from '../../../usecases/deal/deal.usecases';
import { CreateDealDto, UpdateDealDto } from './deal.dto';
export declare class DealController {
    private readonly dealUseCases;
    constructor(dealUseCases: DealUseCases);
    createDeal(deal: CreateDealDto): any;
    getDeal(id: number): any;
    getDeals(): any;
    updateDeal(id: number, deal: UpdateDealDto): any;
    deleteDeal(id: number): any;
}
