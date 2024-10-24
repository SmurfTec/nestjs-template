import { DealStatusUseCases } from '../../../usecases/dealstatus/dealstatus.usecases';
import { CreateDealStatusDto, UpdateDealStatusDto } from './dealstatus.dto';
export declare class DealStatusController {
    private readonly dealStatusUseCases;
    constructor(dealStatusUseCases: DealStatusUseCases);
    createDealStatus(dealStatus: CreateDealStatusDto): Promise<import("../../../domain/models/dealstatus").FetchDealStatusModel>;
    getDealStatus(id: number): Promise<{
        data: import("../../../domain/models/dealstatus").FetchDealStatusModel;
    }>;
    getDealStatuses(): Promise<import("../../../domain/models/dealstatus").FetchDealStatusModel[]>;
    updateDealStatus(id: number, dealStatus: UpdateDealStatusDto): Promise<import("../../../domain/models/dealstatus").FetchDealStatusModel>;
    deleteDealStatus(id: number): Promise<void>;
}
