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
exports.DealController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../../infrastructure/common/guards/jwtAuth.guard");
const deal_usecases_1 = require("../../../usecases/deal/deal.usecases");
const deal_dto_1 = require("./deal.dto");
let DealController = class DealController {
    constructor(dealUseCases) {
        this.dealUseCases = dealUseCases;
    }
    createDeal(deal) {
        return this.dealUseCases.createDeal(deal);
    }
    getDeal(id) {
        return this.dealUseCases.getDeal(id);
    }
    getDeals() {
        return this.dealUseCases.getDeals();
    }
    updateDeal(id, deal) {
        return this.dealUseCases.updateDeal(id, deal);
    }
    deleteDeal(id) {
        return this.dealUseCases.deleteDeal(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deal_dto_1.CreateDealDto]),
    __metadata("design:returntype", void 0)
], DealController.prototype, "createDeal", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DealController.prototype, "getDeal", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DealController.prototype, "getDeals", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, deal_dto_1.UpdateDealDto]),
    __metadata("design:returntype", void 0)
], DealController.prototype, "updateDeal", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DealController.prototype, "deleteDeal", null);
DealController = __decorate([
    (0, common_1.Controller)('deals'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof deal_usecases_1.DealUseCases !== "undefined" && deal_usecases_1.DealUseCases) === "function" ? _a : Object])
], DealController);
exports.DealController = DealController;
//# sourceMappingURL=deal.controller.js.map