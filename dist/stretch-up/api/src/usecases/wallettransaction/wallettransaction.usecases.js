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
exports.WalletTransactionUseCases = void 0;
const common_1 = require("@nestjs/common");
const wallettransaction_repository_1 = require("../../infrastructure/repository/wallettransaction.repository");
let WalletTransactionUseCases = class WalletTransactionUseCases {
    constructor(walletTransactionRepository) {
        this.walletTransactionRepository = walletTransactionRepository;
    }
    async createWalletTransaction(walletTransactionModel) {
        return await this.walletTransactionRepository.createWalletTransaction(walletTransactionModel);
    }
    async getWalletTransaction(id) {
        const data = await this.walletTransactionRepository.getWalletTransaction(id);
        if (!data) {
            throw new common_1.HttpException('WalletTransaction Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data };
    }
    async getWalletTransactions() {
        return await this.walletTransactionRepository.getWalletTransactions();
    }
    async updateWalletTransaction(id, walletTransactionUpdateModel) {
        return await this.walletTransactionRepository.updateWalletTransaction(id, walletTransactionUpdateModel);
    }
    async deleteWalletTransaction(id) {
        return await this.walletTransactionRepository.deleteWalletTransaction(id);
    }
};
WalletTransactionUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wallettransaction_repository_1.WalletTransactionRepository])
], WalletTransactionUseCases);
exports.WalletTransactionUseCases = WalletTransactionUseCases;
//# sourceMappingURL=wallettransaction.usecases.js.map