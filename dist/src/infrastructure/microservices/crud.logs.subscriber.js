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
exports.CrudLogsSubscriber = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rabbitmq_enums_1 = require("../common/enums/rabbitmq.enums");
let CrudLogsSubscriber = class CrudLogsSubscriber {
    async handleBookCreatedEvent(createUserBackupDto) {
    }
};
__decorate([
    (0, microservices_1.EventPattern)(rabbitmq_enums_1.RabbitMQPattersEnums.CRUD_LOGS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudLogsSubscriber.prototype, "handleBookCreatedEvent", null);
CrudLogsSubscriber = __decorate([
    (0, common_1.Controller)()
], CrudLogsSubscriber);
exports.CrudLogsSubscriber = CrudLogsSubscriber;
//# sourceMappingURL=crud.logs.subscriber.js.map