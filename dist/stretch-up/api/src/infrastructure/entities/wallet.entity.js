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
exports.Wallets = void 0;
const typeorm_1 = require("typeorm");
let Wallets = class Wallets {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int4' }),
    __metadata("design:type", Number)
], Wallets.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', }),
    __metadata("design:type", Number)
], Wallets.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], Wallets.prototype, "bank_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], Wallets.prototype, "full_legal_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], Wallets.prototype, "account_number", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Wallets.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Wallets.prototype, "updated_on", void 0);
Wallets = __decorate([
    (0, typeorm_1.Entity)()
], Wallets);
exports.Wallets = Wallets;
//# sourceMappingURL=wallet.entity.js.map