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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../../infrastructure/common/guards/jwtAuth.guard");
const wallet_usecases_1 = require("../../../usecases/wallet/wallet.usecases");
const wallet_dto_1 = require("./wallet.dto");
let WalletController = class WalletController {
    constructor(walletUseCases) {
        this.walletUseCases = walletUseCases;
    }
    createWallet(wallet) {
        return this.walletUseCases.createWallet(wallet);
    }
    getWallet(id) {
        return this.walletUseCases.getWallet(id);
    }
    getWallets() {
        return this.walletUseCases.getWallets();
    }
    updateWallet(id, wallet) {
        return this.walletUseCases.updateWallet(id, wallet);
    }
    deleteWallet(id) {
        return this.walletUseCases.deleteWallet(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wallet_dto_1.CreateWalletDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "createWallet", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getWallets", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, wallet_dto_1.UpdateWalletDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "updateWallet", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "deleteWallet", null);
WalletController = __decorate([
    (0, common_1.Controller)('wallets'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [wallet_usecases_1.WalletUseCases])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map