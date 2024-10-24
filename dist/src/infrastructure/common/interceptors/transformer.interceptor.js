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
exports.TranformerInterceptor = exports.ResponseFormat = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const operators_1 = require("rxjs/operators");
const core_1 = require("@nestjs/core");
const tranformation_rules_1 = require("./tranformation-rules");
class ResponseFormat {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResponseFormat.prototype, "isArray", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseFormat.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseFormat.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseFormat.prototype, "method", void 0);
exports.ResponseFormat = ResponseFormat;
let TranformerInterceptor = class TranformerInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
    }
    transformer(data, tranformTo) {
        let returnData;
        if (Array.isArray(data)) {
            console.log('data123', data);
            console.log('tranformTo', tranformTo);
            returnData = [];
            for (let i = 0; i < data.length; i++) {
                const obj = {};
                for (let j = 0; j < tranformTo.length; j++) {
                    obj[tranformTo[j]] = data[i][tranformTo[j]];
                }
                returnData.push(obj);
            }
            return returnData;
        }
        else {
            returnData = {};
            for (let i = 0; i < tranformTo.length; i++) {
                returnData[tranformTo[i]] = data[tranformTo[i]];
            }
            return returnData;
        }
    }
    intercept(context, next) {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const dataFor = this.reflector.getAllAndOverride('transform', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!(dataFor in tranformation_rules_1.transformationRules)) {
            throw new common_1.HttpException('User In Not Authorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return next.handle().pipe((0, operators_1.map)((data) => {
            const returnData = this.transformer(data, tranformation_rules_1.transformationRules[dataFor]);
            return returnData;
        }));
    }
};
TranformerInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], TranformerInterceptor);
exports.TranformerInterceptor = TranformerInterceptor;
//# sourceMappingURL=transformer.interceptor.js.map