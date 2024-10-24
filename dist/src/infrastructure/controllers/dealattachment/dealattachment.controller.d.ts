import { DealAttachmentUseCases } from '../../../usecases/dealattachment/dealattachment.usecases';
import { CreateDealAttachmentDto, UpdateDealAttachmentDto } from './dealattachment.dto';
export declare class DealAttachmentController {
    private readonly dealAttachmentUseCases;
    constructor(dealAttachmentUseCases: DealAttachmentUseCases);
    createDealAttachment(dealAttachment: CreateDealAttachmentDto): Promise<import("../../../domain/models/dealattachment").FetchDealAttachmentModel>;
    getDealAttachment(id: number): Promise<{
        data: import("../../../domain/models/dealattachment").FetchDealAttachmentModel;
    }>;
    getDealAttachments(): Promise<import("../../../domain/models/dealattachment").FetchDealAttachmentModel[]>;
    updateDealAttachment(id: number, dealAttachment: UpdateDealAttachmentDto): Promise<import("../../../domain/models/dealattachment").FetchDealAttachmentModel>;
    deleteDealAttachment(id: number): Promise<void>;
}
