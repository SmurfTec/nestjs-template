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
exports.WalletTransactionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wallettransaction_entity_1 = require("../entities/wallettransaction.entity");
let WalletTransactionRepository = class WalletTransactionRepository {
    constructor(walletTransactionRepository) {
        this.walletTransactionRepository = walletTransactionRepository;
    }
    async createWalletTransaction(walletTransactionModel) {
        return await this.walletTransactionRepository.save(walletTransactionModel);
    }
    async getWalletTransaction(id) {
        return await this.walletTransactionRepository.findOne({ where: { id } });
    }
    async getWalletTransactions() {
        return await this.walletTransactionRepository.find();
    }
    async updateWalletTransaction(id, updateWalletTransactionModel) {
        const walletTransaction = await this.walletTransactionRepository.findOne({ where: { id } });
        if (walletTransaction) {
            const updatedWalletTransaction = Object.assign(Object.assign({}, walletTransaction), updateWalletTransactionModel);
            return this.walletTransactionRepository.save(updatedWalletTransaction);
        }
        return;
    }
    async deleteWalletTransaction(id) {
        await this.walletTransactionRepository.delete(id);
        return;
    }
};
WalletTransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallettransaction_entity_1.WalletTransactions)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WalletTransactionRepository);
exports.WalletTransactionRepository = WalletTransactionRepository;
//# sourceMappingURL=wallettransaction.repository.js.map