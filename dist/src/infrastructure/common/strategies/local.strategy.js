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
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const login_usecases_1 = require("../../../usecases/auth/login.usecases");
const permission_usecases_1 = require("../../../usecases/auth/permission.usecases");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(loginUsecaseProxy, permissionUsecase) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
        this.loginUsecaseProxy = loginUsecaseProxy;
        this.permissionUsecase = permissionUsecase;
    }
    async validate(email, password) {
        const validateEmail = await this.loginUsecaseProxy.validateEmailForLocalStragtegy(email);
        if (!validateEmail) {
            throw new common_1.UnauthorizedException('Please Verify Your Email');
        }
        const user = await this.loginUsecaseProxy.validateUserForLocalStragtegy(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const { permissions, roles } = await this.permissionUsecase.getOrSetUserPermissionsFromCache(user.id);
        return { user: Object.assign(Object.assign({}, user), { permissions, roles }) };
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [login_usecases_1.LoginUseCases,
        permission_usecases_1.PermissionsUseCases])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map