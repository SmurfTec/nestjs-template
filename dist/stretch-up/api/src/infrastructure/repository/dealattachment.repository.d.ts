import { Repository } from 'typeorm';
import { DealAttachmentModel, FetchDealAttachmentModel, UpdateDealAttachmentModel } from '../../domain/models/dealattachment';
import { IDealAttachment } from '../../domain/repositories/dealattachment.repository.interface';
import { DealAttachments } from '../entities/dealattachment.entity';
export declare class DealAttachmentRepository implements IDealAttachment {
    private dealAttachmentRepository;
    constructor(dealAttachmentRepository: Repository<DealAttachments>);
    createDealAttachment(dealAttachmentModel: DealAttachmentModel): Promise<FetchDealAttachmentModel>;
    getDealAttachment(id: number): Promise<FetchDealAttachmentModel>;
    getDealAttachments(): Promise<FetchDealAttachmentModel[]>;
    updateDealAttachment(id: number, updateDealAttachmentModel: UpdateDealAttachmentModel): Promise<FetchDealAttachmentModel>;
    deleteDealAttachment(id: number): Promise<void>;
}
