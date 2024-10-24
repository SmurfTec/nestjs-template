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
exports.DealAttachments = void 0;
const typeorm_1 = require("typeorm");
const deal_entity_1 = require("./deal.entity");
let DealAttachments = class DealAttachments {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int4' }),
    __metadata("design:type", Number)
], DealAttachments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], DealAttachments.prototype, "attachment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], DealAttachments.prototype, "resource_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => deal_entity_1.Deals, (deals) => deals),
    (0, typeorm_1.JoinColumn)({ name: 'deal' }),
    __metadata("design:type", Number)
], DealAttachments.prototype, "deal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DealAttachments.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DealAttachments.prototype, "updated_on", void 0);
DealAttachments = __decorate([
    (0, typeorm_1.Entity)()
], DealAttachments);
exports.DealAttachments = DealAttachments;
//# sourceMappingURL=dealattachment.entity.js.map