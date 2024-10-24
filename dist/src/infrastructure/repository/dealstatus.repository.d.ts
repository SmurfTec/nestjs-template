import { Repository } from 'typeorm';
import { DealStatusModel, FetchDealStatusModel, UpdateDealStatusModel } from '../../domain/models/dealstatus';
import { IDealStatus } from '../../domain/repositories/dealstatus.repository.interface';
import { DealStatuses } from '../entities/dealstatus.entity';
export declare class DealStatusRepository implements IDealStatus {
    private dealStatusRepository;
    constructor(dealStatusRepository: Repository<DealStatuses>);
    createDealStatus(dealStatusModel: DealStatusModel): Promise<FetchDealStatusModel>;
    getDealStatus(id: number): Promise<FetchDealStatusModel>;
    getDealStatuses(): Promise<FetchDealStatusModel[]>;
    updateDealStatus(id: number, updateDealStatusModel: UpdateDealStatusModel): Promise<FetchDealStatusModel>;
    deleteDealStatus(id: number): Promise<void>;
}
