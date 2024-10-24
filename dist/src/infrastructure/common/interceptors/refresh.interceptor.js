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
exports.RefreshInterceptor = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const operators_1 = require("rxjs/operators");
const login_usecases_1 = require("../../../usecases/auth/login.usecases");
let RefreshInterceptor = class RefreshInterceptor extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'jwt-refresh-token') {
    constructor(loginUsecaseProxy) {
        super();
        this.loginUsecaseProxy = loginUsecaseProxy;
    }
    async intercept(context, next) {
        var _a, _b;
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        if ((request === null || request === void 0 ? void 0 : request.cookies) &&
            !((_a = request.cookies) === null || _a === void 0 ? void 0 : _a.Authentication) &&
            ((_b = request.cookies) === null || _b === void 0 ? void 0 : _b.Refresh)) {
            const accessTokenCookie = await this.loginUsecaseProxy.getCookieWithJwtToken(request.user.username);
            request.res.setHeader('Set-Cookie', accessTokenCookie);
        }
        return next.handle().pipe((0, operators_1.map)((data) => data));
    }
};
RefreshInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [login_usecases_1.LoginUseCases])
], RefreshInterceptor);
exports.RefreshInterceptor = RefreshInterceptor;
//# sourceMappingURL=refresh.interceptor.js.map