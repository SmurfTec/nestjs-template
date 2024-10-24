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
exports.WalletStatusRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const walletstatus_entity_1 = require("../entities/walletstatus.entity");
let WalletStatusRepository = class WalletStatusRepository {
    constructor(walletStatusRepository) {
        this.walletStatusRepository = walletStatusRepository;
    }
    async createWalletStatus(walletStatusModel) {
        return await this.walletStatusRepository.save(walletStatusModel);
    }
    async getWalletStatus(id) {
        return await this.walletStatusRepository.findOne({ where: { id } });
    }
    async getWalletStatuses() {
        return await this.walletStatusRepository.find();
    }
    async updateWalletStatus(id, updateWalletStatusModel) {
        const walletStatus = await this.walletStatusRepository.findOne({ where: { id } });
        if (walletStatus) {
            const updatedWalletStatus = Object.assign(Object.assign({}, walletStatus), updateWalletStatusModel);
            return this.walletStatusRepository.save(updatedWalletStatus);
        }
        return;
    }
    async deleteWalletStatus(id) {
        await this.walletStatusRepository.delete(id);
        return;
    }
};
WalletStatusRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(walletstatus_entity_1.WalletStatuses)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WalletStatusRepository);
exports.WalletStatusRepository = WalletStatusRepository;
//# sourceMappingURL=walletstatus.repository.js.map