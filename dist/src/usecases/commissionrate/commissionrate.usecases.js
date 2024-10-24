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
exports.CommissionRateUseCases = void 0;
const common_1 = require("@nestjs/common");
const commissionrate_repository_1 = require("../../infrastructure/repository/commissionrate.repository");
let CommissionRateUseCases = class CommissionRateUseCases {
    constructor(commissionRateRepository) {
        this.commissionRateRepository = commissionRateRepository;
    }
    async createCommissionRate(commissionRateModel) {
        return await this.commissionRateRepository.createCommissionRate(commissionRateModel);
    }
    async getCommissionRate(id) {
        const data = await this.commissionRateRepository.getCommissionRate(id);
        if (!data) {
            throw new common_1.HttpException('CommissionRate Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data };
    }
    async getCommissionRates() {
        return await this.commissionRateRepository.getCommissionRates();
    }
    async updateCommissionRate(id, commissionRateUpdateModel) {
        return await this.commissionRateRepository.updateCommissionRate(id, commissionRateUpdateModel);
    }
    async deleteCommissionRate(id) {
        return await this.commissionRateRepository.deleteCommissionRate(id);
    }
};
CommissionRateUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [commissionrate_repository_1.CommissionRateRepository])
], CommissionRateUseCases);
exports.CommissionRateUseCases = CommissionRateUseCases;
//# sourceMappingURL=commissionrate.usecases.js.map