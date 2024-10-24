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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealStatusController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../../infrastructure/common/guards/jwtAuth.guard");
const dealstatus_usecases_1 = require("../../../usecases/dealstatus/dealstatus.usecases");
const dealstatus_dto_1 = require("./dealstatus.dto");
let DealStatusController = class DealStatusController {
    constructor(dealStatusUseCases) {
        this.dealStatusUseCases = dealStatusUseCases;
    }
    createDealStatus(dealStatus) {
        return this.dealStatusUseCases.createDealStatus(dealStatus);
    }
    getDealStatus(id) {
        return this.dealStatusUseCases.getDealStatus(id);
    }
    getDealStatuses() {
        return this.dealStatusUseCases.getDealStatuses();
    }
    updateDealStatus(id, dealStatus) {
        return this.dealStatusUseCases.updateDealStatus(id, dealStatus);
    }
    deleteDealStatus(id) {
        return this.dealStatusUseCases.deleteDealStatus(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dealstatus_dto_1.CreateDealStatusDto]),
    __metadata("design:returntype", void 0)
], DealStatusController.prototype, "createDealStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DealStatusController.prototype, "getDealStatus", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DealStatusController.prototype, "getDealStatuses", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dealstatus_dto_1.UpdateDealStatusDto]),
    __metadata("design:returntype", void 0)
], DealStatusController.prototype, "updateDealStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DealStatusController.prototype, "deleteDealStatus", null);
DealStatusController = __decorate([
    (0, common_1.Controller)('dealstatuses'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof dealstatus_usecases_1.DealStatusUseCases !== "undefined" && dealstatus_usecases_1.DealStatusUseCases) === "function" ? _a : Object])
], DealStatusController);
exports.DealStatusController = DealStatusController;
//# sourceMappingURL=dealstatus.controller.js.map