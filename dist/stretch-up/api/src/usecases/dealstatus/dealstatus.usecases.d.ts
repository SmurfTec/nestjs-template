import { DealStatusModel, UpdateDealStatusModel } from '../../domain/models/dealstatus';
import { DealStatusRepository } from '../../infrastructure/repository/dealstatus.repository';
export declare class DealStatusUseCases {
    private readonly dealStatusRepository;
    constructor(dealStatusRepository: DealStatusRepository);
    createDealStatus(dealStatusModel: DealStatusModel): Promise<import("../../domain/models/dealstatus").FetchDealStatusModel>;
    getDealStatus(id: number): Promise<{
        data: import("../../domain/models/dealstatus").FetchDealStatusModel;
    }>;
    getDealStatuses(): Promise<import("../../domain/models/dealstatus").FetchDealStatusModel[]>;
    updateDealStatus(id: number, dealStatusUpdateModel: UpdateDealStatusModel): Promise<import("../../domain/models/dealstatus").FetchDealStatusModel>;
    deleteDealStatus(id: number): Promise<void>;
}
