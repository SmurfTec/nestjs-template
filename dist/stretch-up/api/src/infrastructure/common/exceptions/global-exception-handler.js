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
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        console.log(exception);
        const status = exception.hasOwnProperty('response')
            ? exception['response']['statusCode']
                ? exception['response']['statusCode']
                : exception['status']
                    ? exception['status']
                    : 500
            : exception.hasOwnProperty('status') && exception['status'] === 500
                ? 500
                : exception['detail']
                    ? 400
                    : 500;
        const message = exception.hasOwnProperty('response')
            ? exception['response']['message'] || exception['message']
            : exception.hasOwnProperty('status') && exception['status'] === 500
                ? 'Internal Server Error'
                : exception['detail']
                    ? exception['detail']
                    : 'Internal Server Error';
        const responseBody = {
            message,
            status,
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, status);
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=global-exception-handler.js.map