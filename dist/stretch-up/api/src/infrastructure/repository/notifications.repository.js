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
exports.NotificationsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notifications_entity_1 = require("../entities/notifications.entity");
const notifications_enums_1 = require("../common/enums/notifications.enums");
let NotificationsRepository = class NotificationsRepository {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async createNotification(notificationModel) {
        var _a, _b, _c, _d, _e;
        const notification = await this.notificationRepository
            .query(`INSERT INTO public.notifications
(created_on, updated_on, message, is_active, "resource_name", "resource_id" 
,"from_user_id", "from_user_name" 
,"type")
VALUES(now(), now(), '${notificationModel.message}', true, 
'${(_a = notificationModel.resource_name) !== null && _a !== void 0 ? _a : ''}', ${(_b = notificationModel.resource_id) !== null && _b !== void 0 ? _b : 0},

${(_c = notificationModel.from_user_id) !== null && _c !== void 0 ? _c : 0}, '${(_d = notificationModel.from_user_name) !== null && _d !== void 0 ? _d : ''}',

'${(_e = notificationModel.type) !== null && _e !== void 0 ? _e : 'ALL'}'::notifications_type_enum) RETURNING id;
`);
        return await this.notificationRepository.findOne({
            where: { id: notification[0]['id'] },
        });
    }
    async getNotification(id) {
        return await this.notificationRepository.query(`select * from notifications n where id = ${id} limit 1`);
    }
    async getNotifications() {
        return await this.notificationRepository.find();
    }
    async getTypeAllNotifications() {
        return await this.notificationRepository.query(`select * from notifications n where "type" = '${notifications_enums_1.notificationEnums.ALL}'`);
    }
    async updateNotification(id, updateNotificationModel) {
        const notification = await this.notificationRepository.findOne({
            where: { id },
        });
        if (notification) {
            const updatedNotification = Object.assign(Object.assign({}, notification), updateNotificationModel);
            return this.notificationRepository.save(updatedNotification);
        }
        return;
    }
    async deleteNotification(id) {
        await this.notificationRepository.delete(id);
        return;
    }
};
NotificationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notifications_entity_1.Notifications)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationsRepository);
exports.NotificationsRepository = NotificationsRepository;
//# sourceMappingURL=notifications.repository.js.map