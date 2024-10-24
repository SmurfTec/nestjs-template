import { DealModel,FetchDealModel,UpdateDealModel } from '../models/Deal';
export interface IDeal {
createDeal(dealModel:DealModel): Promise<FetchDealModel>;
getDeal(id:number) : Promise<FetchDealModel>;
getDeals() : Promise<FetchDealModel[]>;
updateDeal(id: number, updateDealModel:UpdateDealModel): Promise<FetchDealModel>;
deleteDeal(id:number) : Promise<void>;
}
