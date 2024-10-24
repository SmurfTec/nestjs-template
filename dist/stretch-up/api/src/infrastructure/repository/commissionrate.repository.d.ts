import { Repository } from 'typeorm';
import { CommissionRateModel, FetchCommissionRateModel, UpdateCommissionRateModel } from '../../domain/models/commissionrate';
import { ICommissionRate } from '../../domain/repositories/commissionrate.repository.interface';
import { CommissionRates } from '../entities/commissionrate.entity';
export declare class CommissionRateRepository implements ICommissionRate {
    private commissionRateRepository;
    constructor(commissionRateRepository: Repository<CommissionRates>);
    createCommissionRate(commissionRateModel: CommissionRateModel): Promise<FetchCommissionRateModel>;
    getCommissionRate(id: number): Promise<FetchCommissionRateModel>;
    getCommissionRates(): Promise<FetchCommissionRateModel[]>;
    updateCommissionRate(id: number, updateCommissionRateModel: UpdateCommissionRateModel): Promise<FetchCommissionRateModel>;
    deleteCommissionRate(id: number): Promise<void>;
}
