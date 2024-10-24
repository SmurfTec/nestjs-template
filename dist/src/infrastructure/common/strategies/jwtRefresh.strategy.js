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
exports.JwtRefreshTokenStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const environment_config_service_1 = require("../../config/environment-config/environment-config.service");
const login_usecases_1 = require("../../../usecases/auth/login.usecases");
let JwtRefreshTokenStrategy = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    constructor(configService, loginUsecaseProxy) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.refresh;
                },
            ]),
            secretOrKey: configService.getJwtRefreshSecret(),
            passReqToCallback: true,
        });
        this.configService = configService;
        this.loginUsecaseProxy = loginUsecaseProxy;
    }
    async validate(request, payload) {
        var _a;
        const refreshToken = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
        const user = this.loginUsecaseProxy.getUserIfRefreshTokenMatches(refreshToken, payload.email);
        if (!user) {
            throw new common_1.UnauthorizedException('User Not Found');
        }
        return user;
    }
};
JwtRefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [environment_config_service_1.EnvironmentConfigService,
        login_usecases_1.LoginUseCases])
], JwtRefreshTokenStrategy);
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy;
//# sourceMappingURL=jwtRefresh.strategy.js.map