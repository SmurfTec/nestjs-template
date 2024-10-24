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
exports.WalletStatusController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../../infrastructure/common/guards/jwtAuth.guard");
const walletstatus_usecases_1 = require("../../../usecases/walletstatus/walletstatus.usecases");
const walletstatus_dto_1 = require("./walletstatus.dto");
let WalletStatusController = class WalletStatusController {
    constructor(walletStatusUseCases) {
        this.walletStatusUseCases = walletStatusUseCases;
    }
    createWalletStatus(walletStatus) {
        return this.walletStatusUseCases.createWalletStatus(walletStatus);
    }
    getWalletStatus(id) {
        return this.walletStatusUseCases.getWalletStatus(id);
    }
    getWalletStatuses() {
        return this.walletStatusUseCases.getWalletStatuses();
    }
    updateWalletStatus(id, walletStatus) {
        return this.walletStatusUseCases.updateWalletStatus(id, walletStatus);
    }
    deleteWalletStatus(id) {
        return this.walletStatusUseCases.deleteWalletStatus(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [walletstatus_dto_1.CreateWalletStatusDto]),
    __metadata("design:returntype", void 0)
], WalletStatusController.prototype, "createWalletStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WalletStatusController.prototype, "getWalletStatus", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WalletStatusController.prototype, "getWalletStatuses", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, walletstatus_dto_1.UpdateWalletStatusDto]),
    __metadata("design:returntype", void 0)
], WalletStatusController.prototype, "updateWalletStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WalletStatusController.prototype, "deleteWalletStatus", null);
WalletStatusController = __decorate([
    (0, common_1.Controller)('walletstatuses'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [walletstatus_usecases_1.WalletStatusUseCases])
], WalletStatusController);
exports.WalletStatusController = WalletStatusController;
//# sourceMappingURL=walletstatus.controller.js.map