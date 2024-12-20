"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealAttachmentUseCases = void 0;
const common_1 = require("@nestjs/common");
const dealattachment_repository_1 = require("../../infrastructure/repository/dealattachment.repository");
let DealAttachmentUseCases = class DealAttachmentUseCases {
    constructor(dealAttachmentRepository) {
        this.dealAttachmentRepository = dealAttachmentRepository;
    }
    async createDealAttachment(dealAttachmentModel) {
        return await this.dealAttachmentRepository.createDealAttachment(dealAttachmentModel);
    }
    async getDealAttachment(id) {
        const data = await this.dealAttachmentRepository.getDealAttachment(id);
        if (!data) {
            throw new common_1.HttpException('DealAttachment Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data };
    }
    async getDealAttachments() {
        return await this.dealAttachmentRepository.getDealAttachments();
    }
    async updateDealAttachment(id, dealAttachmentUpdateModel) {
        return await this.dealAttachmentRepository.updateDealAttachment(id, dealAttachmentUpdateModel);
    }
    async deleteDealAttachment(id) {
        return await this.dealAttachmentRepository.deleteDealAttachment(id);
    }
};
DealAttachmentUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dealattachment_repository_1.DealAttachmentRepository])
], DealAttachmentUseCases);
exports.DealAttachmentUseCases = DealAttachmentUseCases;
//# sourceMappingURL=dealattachment.usecases.js.map