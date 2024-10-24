import { CommissionRateUseCases } from '../../../usecases/commissionrate/commissionrate.usecases';
import { CreateCommissionRateDto, UpdateCommissionRateDto } from './commissionrate.dto';
export declare class CommissionRateController {
    private readonly commissionRateUseCases;
    constructor(commissionRateUseCases: CommissionRateUseCases);
    createCommissionRate(commissionRate: CreateCommissionRateDto): any;
    getCommissionRate(id: number): any;
    getCommissionRates(): any;
    updateCommissionRate(id: number, commissionRate: UpdateCommissionRateDto): any;
    deleteCommissionRate(id: number): any;
}
