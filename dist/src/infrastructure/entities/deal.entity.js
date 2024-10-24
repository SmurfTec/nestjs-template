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
exports.Deals = void 0;
const typeorm_1 = require("typeorm");
const wallet_entity_1 = require("./wallet.entity");
let Deals = class Deals {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int4' }),
    __metadata("design:type", Number)
], Deals.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], Deals.prototype, "property_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], Deals.prototype, "property_apartment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], Deals.prototype, "property_area", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', }),
    __metadata("design:type", Date)
], Deals.prototype, "property_unit_sale_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], Deals.prototype, "developer_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', }),
    __metadata("design:type", Number)
], Deals.prototype, "developer_commission", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', }),
    __metadata("design:type", Date)
], Deals.prototype, "expected_commission_paydate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallet_entity_1.Wallets, (wallets) => wallets),
    (0, typeorm_1.JoinColumn)({ name: 'deal' }),
    __metadata("design:type", Number)
], Deals.prototype, "deal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Deals.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Deals.prototype, "updated_on", void 0);
Deals = __decorate([
    (0, typeorm_1.Entity)()
], Deals);
exports.Deals = Deals;
//# sourceMappingURL=deal.entity.js.map