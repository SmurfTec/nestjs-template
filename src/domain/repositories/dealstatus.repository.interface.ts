import { DealStatusModel,FetchDealStatusModel,UpdateDealStatusModel } from '../models/DealStatus';
export interface IDealStatus {
createDealStatus(dealStatusModel:DealStatusModel): Promise<FetchDealStatusModel>;
getDealStatus(id:number) : Promise<FetchDealStatusModel>;
getDealStatuses() : Promise<FetchDealStatusModel[]>;
updateDealStatus(id: number, updateDealStatusModel:UpdateDealStatusModel): Promise<FetchDealStatusModel>;
deleteDealStatus(id:number) : Promise<void>;
}
