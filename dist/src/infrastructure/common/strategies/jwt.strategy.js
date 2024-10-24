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
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const login_usecases_1 = require("../../../usecases/auth/login.usecases");
const environment_config_service_1 = require("../../../infrastructure/config/environment-config/environment-config.service");
const user_data_1 = require("../user.data");
const permission_usecases_1 = require("../../../usecases/auth/permission.usecases");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(loginUsecase, permissionUsecase, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.authentication;
                },
            ]),
            secretOrKey: configService.getJwtSecret(),
        });
        this.loginUsecase = loginUsecase;
        this.permissionUsecase = permissionUsecase;
        this.configService = configService;
    }
    async validate(payload) {
        let user = await this.loginUsecase.validateUserForJWTStragtegy(payload.email);
        if (!user) {
            throw new common_1.UnauthorizedException('User Not Found');
        }
        const { permissions, roles } = await this.permissionUsecase.getUserPermissionsAndRoles(user.id);
        new user_data_1.UserData(Object.assign(Object.assign({}, user), { permissions, roles }));
        return user;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [login_usecases_1.LoginUseCases,
        permission_usecases_1.PermissionsUseCases,
        environment_config_service_1.EnvironmentConfigService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map