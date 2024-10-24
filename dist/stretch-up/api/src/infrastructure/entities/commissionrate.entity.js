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
exports.CommissionRates = void 0;
const typeorm_1 = require("typeorm");
let CommissionRates = class CommissionRates {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int4' }),
    __metadata("design:type", Number)
], CommissionRates.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision', nullable: false, }),
    __metadata("design:type", Number)
], CommissionRates.prototype, "percentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, }),
    __metadata("design:type", Number)
], CommissionRates.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, }),
    __metadata("design:type", Number)
], CommissionRates.prototype, "from_day", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, }),
    __metadata("design:type", Number)
], CommissionRates.prototype, "to_day", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], CommissionRates.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], CommissionRates.prototype, "updated_on", void 0);
CommissionRates = __decorate([
    (0, typeorm_1.Entity)()
], CommissionRates);
exports.CommissionRates = CommissionRates;
//# sourceMappingURL=commissionrate.entity.js.map