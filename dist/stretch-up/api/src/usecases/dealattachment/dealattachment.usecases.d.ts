import { DealAttachmentModel, UpdateDealAttachmentModel } from '../../domain/models/dealattachment';
import { DealAttachmentRepository } from '../../infrastructure/repository/dealattachment.repository';
export declare class DealAttachmentUseCases {
    private readonly dealAttachmentRepository;
    constructor(dealAttachmentRepository: DealAttachmentRepository);
    createDealAttachment(dealAttachmentModel: DealAttachmentModel): Promise<import("../../domain/models/dealattachment").FetchDealAttachmentModel>;
    getDealAttachment(id: number): Promise<{
        data: import("../../domain/models/dealattachment").FetchDealAttachmentModel;
    }>;
    getDealAttachments(): Promise<import("../../domain/models/dealattachment").FetchDealAttachmentModel[]>;
    updateDealAttachment(id: number, dealAttachmentUpdateModel: UpdateDealAttachmentModel): Promise<import("../../domain/models/dealattachment").FetchDealAttachmentModel>;
    deleteDealAttachment(id: number): Promise<void>;
}
