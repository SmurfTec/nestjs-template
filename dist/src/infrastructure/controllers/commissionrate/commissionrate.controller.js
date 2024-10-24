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
exports.CommissionRateController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../../infrastructure/common/guards/jwtAuth.guard");
const commissionrate_usecases_1 = require("../../../usecases/commissionrate/commissionrate.usecases");
const commissionrate_dto_1 = require("./commissionrate.dto");
let CommissionRateController = class CommissionRateController {
    constructor(commissionRateUseCases) {
        this.commissionRateUseCases = commissionRateUseCases;
    }
    createCommissionRate(commissionRate) {
        return this.commissionRateUseCases.createCommissionRate(commissionRate);
    }
    getCommissionRate(id) {
        return this.commissionRateUseCases.getCommissionRate(id);
    }
    getCommissionRates() {
        return this.commissionRateUseCases.getCommissionRates();
    }
    updateCommissionRate(id, commissionRate) {
        return this.commissionRateUseCases.updateCommissionRate(id, commissionRate);
    }
    deleteCommissionRate(id) {
        return this.commissionRateUseCases.deleteCommissionRate(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commissionrate_dto_1.CreateCommissionRateDto]),
    __metadata("design:returntype", void 0)
], CommissionRateController.prototype, "createCommissionRate", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommissionRateController.prototype, "getCommissionRate", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommissionRateController.prototype, "getCommissionRates", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, commissionrate_dto_1.UpdateCommissionRateDto]),
    __metadata("design:returntype", void 0)
], CommissionRateController.prototype, "updateCommissionRate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommissionRateController.prototype, "deleteCommissionRate", null);
CommissionRateController = __decorate([
    (0, common_1.Controller)('commissionrates'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [commissionrate_usecases_1.CommissionRateUseCases])
], CommissionRateController);
exports.CommissionRateController = CommissionRateController;
//# sourceMappingURL=commissionrate.controller.js.map