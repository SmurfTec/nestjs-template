"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQ = void 0;
class RabbitMQ {
    constructor(data) {
        RabbitMQ.data = data;
    }
    static getClient() {
        return RabbitMQ.data;
    }
}
exports.RabbitMQ = RabbitMQ;
//# sourceMappingURL=rabbitmq.data.js.map