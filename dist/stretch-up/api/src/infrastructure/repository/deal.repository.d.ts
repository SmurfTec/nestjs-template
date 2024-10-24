import { Repository } from 'typeorm';
import { DealModel, FetchDealModel, UpdateDealModel } from '../../domain/models/deal';
import { IDeal } from '../../domain/repositories/deal.repository.interface';
import { Deals } from '../entities/deal.entity';
export declare class DealRepository implements IDeal {
    private dealRepository;
    constructor(dealRepository: Repository<Deals>);
    createDeal(dealModel: DealModel): Promise<FetchDealModel>;
    getDeal(id: number): Promise<FetchDealModel>;
    getDeals(): Promise<FetchDealModel[]>;
    updateDeal(id: number, updateDealModel: UpdateDealModel): Promise<FetchDealModel>;
    deleteDeal(id: number): Promise<void>;
}
