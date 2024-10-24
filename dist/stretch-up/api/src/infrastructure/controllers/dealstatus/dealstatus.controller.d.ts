import { DealStatusUseCases } from '../../../usecases/dealstatus/dealstatus.usecases';
import { CreateDealStatusDto, UpdateDealStatusDto } from './dealstatus.dto';
export declare class DealStatusController {
    private readonly dealStatusUseCases;
    constructor(dealStatusUseCases: DealStatusUseCases);
    createDealStatus(dealStatus: CreateDealStatusDto): any;
    getDealStatus(id: number): any;
    getDealStatuses(): any;
    updateDealStatus(id: number, dealStatus: UpdateDealStatusDto): any;
    deleteDealStatus(id: number): any;
}
