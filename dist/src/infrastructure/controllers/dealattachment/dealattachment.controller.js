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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealAttachmentController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../../infrastructure/common/guards/jwtAuth.guard");
const dealattachment_usecases_1 = require("../../../usecases/dealattachment/dealattachment.usecases");
const dealattachment_dto_1 = require("./dealattachment.dto");
let DealAttachmentController = class DealAttachmentController {
    constructor(dealAttachmentUseCases) {
        this.dealAttachmentUseCases = dealAttachmentUseCases;
    }
    createDealAttachment(dealAttachment) {
        return this.dealAttachmentUseCases.createDealAttachment(dealAttachment);
    }
    getDealAttachment(id) {
        return this.dealAttachmentUseCases.getDealAttachment(id);
    }
    getDealAttachments() {
        return this.dealAttachmentUseCases.getDealAttachments();
    }
    updateDealAttachment(id, dealAttachment) {
        return this.dealAttachmentUseCases.updateDealAttachment(id, dealAttachment);
    }
    deleteDealAttachment(id) {
        return this.dealAttachmentUseCases.deleteDealAttachment(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dealattachment_dto_1.CreateDealAttachmentDto]),
    __metadata("design:returntype", void 0)
], DealAttachmentController.prototype, "createDealAttachment", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DealAttachmentController.prototype, "getDealAttachment", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DealAttachmentController.prototype, "getDealAttachments", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dealattachment_dto_1.UpdateDealAttachmentDto]),
    __metadata("design:returntype", void 0)
], DealAttachmentController.prototype, "updateDealAttachment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DealAttachmentController.prototype, "deleteDealAttachment", null);
DealAttachmentController = __decorate([
    (0, common_1.Controller)('dealattachments'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [dealattachment_usecases_1.DealAttachmentUseCases])
], DealAttachmentController);
exports.DealAttachmentController = DealAttachmentController;
//# sourceMappingURL=dealattachment.controller.js.map