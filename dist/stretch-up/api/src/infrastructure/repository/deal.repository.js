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
exports.DealRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const deal_entity_1 = require("../entities/deal.entity");
let DealRepository = class DealRepository {
    constructor(dealRepository) {
        this.dealRepository = dealRepository;
    }
    async createDeal(dealModel) {
        return await this.dealRepository.save(dealModel);
    }
    async getDeal(id) {
        return await this.dealRepository.findOne({ where: { id } });
    }
    async getDeals() {
        return await this.dealRepository.find();
    }
    async updateDeal(id, updateDealModel) {
        const deal = await this.dealRepository.findOne({ where: { id } });
        if (deal) {
            const updatedDeal = Object.assign(Object.assign({}, deal), updateDealModel);
            return this.dealRepository.save(updatedDeal);
        }
        return;
    }
    async deleteDeal(id) {
        await this.dealRepository.delete(id);
        return;
    }
};
DealRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deal_entity_1.Deals)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DealRepository);
exports.DealRepository = DealRepository;
//# sourceMappingURL=deal.repository.js.map