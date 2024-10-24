import { DealAttachmentUseCases } from '../../../usecases/dealattachment/dealattachment.usecases';
import { CreateDealAttachmentDto, UpdateDealAttachmentDto } from './dealattachment.dto';
export declare class DealAttachmentController {
    private readonly dealAttachmentUseCases;
    constructor(dealAttachmentUseCases: DealAttachmentUseCases);
    createDealAttachment(dealAttachment: CreateDealAttachmentDto): any;
    getDealAttachment(id: number): any;
    getDealAttachments(): any;
    updateDealAttachment(id: number, dealAttachment: UpdateDealAttachmentDto): any;
    deleteDealAttachment(id: number): any;
}
