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
exports.NotificationPreferenceRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notificationpreference_entity_1 = require("../entities/notificationpreference.entity");
let NotificationPreferenceRepository = class NotificationPreferenceRepository {
    constructor(notificationPreferenceRepository) {
        this.notificationPreferenceRepository = notificationPreferenceRepository;
    }
    async createNotificationPreference(notificationPreferenceModel) {
        return await this.notificationPreferenceRepository.save(notificationPreferenceModel);
    }
    async getNotificationPreference(id) {
        return await this.notificationPreferenceRepository.findOne({ where: { id } });
    }
    async getNotificationPreferences() {
        return await this.notificationPreferenceRepository.find();
    }
    async updateNotificationPreference(id, updateNotificationPreferenceModel) {
        const notificationPreference = await this.notificationPreferenceRepository.findOne({ where: { id } });
        if (notificationPreference) {
            const updatedNotificationPreference = Object.assign(Object.assign({}, notificationPreference), updateNotificationPreferenceModel);
            return this.notificationPreferenceRepository.save(updatedNotificationPreference);
        }
        return;
    }
    async deleteNotificationPreference(id) {
        await this.notificationPreferenceRepository.delete(id);
        return;
    }
};
NotificationPreferenceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notificationpreference_entity_1.NotificationPreferences)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationPreferenceRepository);
exports.NotificationPreferenceRepository = NotificationPreferenceRepository;
//# sourceMappingURL=notificationpreference.repository.js.map