import { CommissionRateModel,FetchCommissionRateModel,UpdateCommissionRateModel } from '../models/CommissionRate';
export interface ICommissionRate {
createCommissionRate(commissionRateModel:CommissionRateModel): Promise<FetchCommissionRateModel>;
getCommissionRate(id:number) : Promise<FetchCommissionRateModel>;
getCommissionRates() : Promise<FetchCommissionRateModel[]>;
updateCommissionRate(id: number, updateCommissionRateModel:UpdateCommissionRateModel): Promise<FetchCommissionRateModel>;
deleteCommissionRate(id:number) : Promise<void>;
}
