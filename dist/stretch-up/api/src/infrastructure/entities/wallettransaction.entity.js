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
exports.WalletTransactions = void 0;
const typeorm_1 = require("typeorm");
const wallet_entity_1 = require("./wallet.entity");
let WalletTransactions = class WalletTransactions {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int4' }),
    __metadata("design:type", Number)
], WalletTransactions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', }),
    __metadata("design:type", Number)
], WalletTransactions.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallet_entity_1.Wallets, (wallets) => wallets),
    (0, typeorm_1.JoinColumn)({ name: 'wallet' }),
    __metadata("design:type", Number)
], WalletTransactions.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], WalletTransactions.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], WalletTransactions.prototype, "updated_on", void 0);
WalletTransactions = __decorate([
    (0, typeorm_1.Entity)()
], WalletTransactions);
exports.WalletTransactions = WalletTransactions;
//# sourceMappingURL=wallettransaction.entity.js.map