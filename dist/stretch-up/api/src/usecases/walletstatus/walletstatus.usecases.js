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
exports.WalletStatusUseCases = void 0;
const common_1 = require("@nestjs/common");
const walletstatus_repository_1 = require("../../infrastructure/repository/walletstatus.repository");
let WalletStatusUseCases = class WalletStatusUseCases {
    constructor(walletStatusRepository) {
        this.walletStatusRepository = walletStatusRepository;
    }
    async createWalletStatus(walletStatusModel) {
        return await this.walletStatusRepository.createWalletStatus(walletStatusModel);
    }
    async getWalletStatus(id) {
        const data = await this.walletStatusRepository.getWalletStatus(id);
        if (!data) {
            throw new common_1.HttpException('WalletStatus Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data };
    }
    async getWalletStatuses() {
        return await this.walletStatusRepository.getWalletStatuses();
    }
    async updateWalletStatus(id, walletStatusUpdateModel) {
        return await this.walletStatusRepository.updateWalletStatus(id, walletStatusUpdateModel);
    }
    async deleteWalletStatus(id) {
        return await this.walletStatusRepository.deleteWalletStatus(id);
    }
};
WalletStatusUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [walletstatus_repository_1.WalletStatusRepository])
], WalletStatusUseCases);
exports.WalletStatusUseCases = WalletStatusUseCases;
//# sourceMappingURL=walletstatus.usecases.js.map