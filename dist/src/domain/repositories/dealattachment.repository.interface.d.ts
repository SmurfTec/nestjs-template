import { DealAttachmentModel, FetchDealAttachmentModel, UpdateDealAttachmentModel } from '../models/DealAttachment';
export interface IDealAttachment {
    createDealAttachment(dealAttachmentModel: DealAttachmentModel): Promise<FetchDealAttachmentModel>;
    getDealAttachment(id: number): Promise<FetchDealAttachmentModel>;
    getDealAttachments(): Promise<FetchDealAttachmentModel[]>;
    updateDealAttachment(id: number, updateDealAttachmentModel: UpdateDealAttachmentModel): Promise<FetchDealAttachmentModel>;
    deleteDealAttachment(id: number): Promise<void>;
}
