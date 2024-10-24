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
exports.DealUseCases = void 0;
const common_1 = require("@nestjs/common");
const deal_repository_1 = require("../../infrastructure/repository/deal.repository");
let DealUseCases = class DealUseCases {
    constructor(dealRepository) {
        this.dealRepository = dealRepository;
    }
    async createDeal(dealModel) {
        return await this.dealRepository.createDeal(dealModel);
    }
    async getDeal(id) {
        const data = await this.dealRepository.getDeal(id);
        if (!data) {
            throw new common_1.HttpException('Deal Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data };
    }
    async getDeals() {
        return await this.dealRepository.getDeals();
    }
    async updateDeal(id, dealUpdateModel) {
        return await this.dealRepository.updateDeal(id, dealUpdateModel);
    }
    async deleteDeal(id) {
        return await this.dealRepository.deleteDeal(id);
    }
};
DealUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [deal_repository_1.DealRepository])
], DealUseCases);
exports.DealUseCases = DealUseCases;
//# sourceMappingURL=deal.usecases.js.map