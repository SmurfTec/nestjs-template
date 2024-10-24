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
exports.WalletTransactionController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../../infrastructure/common/guards/jwtAuth.guard");
const wallettransaction_usecases_1 = require("../../../usecases/wallettransaction/wallettransaction.usecases");
const wallettransaction_dto_1 = require("./wallettransaction.dto");
let WalletTransactionController = class WalletTransactionController {
    constructor(walletTransactionUseCases) {
        this.walletTransactionUseCases = walletTransactionUseCases;
    }
    createWalletTransaction(walletTransaction) {
        return this.walletTransactionUseCases.createWalletTransaction(walletTransaction);
    }
    getWalletTransaction(id) {
        return this.walletTransactionUseCases.getWalletTransaction(id);
    }
    getWalletTransactions() {
        return this.walletTransactionUseCases.getWalletTransactions();
    }
    updateWalletTransaction(id, walletTransaction) {
        return this.walletTransactionUseCases.updateWalletTransaction(id, walletTransaction);
    }
    deleteWalletTransaction(id) {
        return this.walletTransactionUseCases.deleteWalletTransaction(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wallettransaction_dto_1.CreateWalletTransactionDto]),
    __metadata("design:returntype", void 0)
], WalletTransactionController.prototype, "createWalletTransaction", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WalletTransactionController.prototype, "getWalletTransaction", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WalletTransactionController.prototype, "getWalletTransactions", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, wallettransaction_dto_1.UpdateWalletTransactionDto]),
    __metadata("design:returntype", void 0)
], WalletTransactionController.prototype, "updateWalletTransaction", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WalletTransactionController.prototype, "deleteWalletTransaction", null);
WalletTransactionController = __decorate([
    (0, common_1.Controller)('wallettransactions'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [wallettransaction_usecases_1.WalletTransactionUseCases])
], WalletTransactionController);
exports.WalletTransactionController = WalletTransactionController;
//# sourceMappingURL=wallettransaction.controller.js.map