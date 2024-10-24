"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEvents = void 0;
const stream_1 = require("stream");
class NotificationEvents {
    static createNotificationEmitter(data) {
        this.notificationEvent.emit('notify', data);
    }
    static onCreateNotificationHandler(cb) {
        this.notificationEvent.on('notify', cb);
    }
}
exports.NotificationEvents = NotificationEvents;
NotificationEvents.notificationEvent = new stream_1.EventEmitter();
//# sourceMappingURL=notification-events.js.map