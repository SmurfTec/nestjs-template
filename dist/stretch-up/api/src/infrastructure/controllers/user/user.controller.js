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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const authorization_usecases_1 = require("../../../usecases/auth/authorization.usecases");
const login_usecases_1 = require("./../../../usecases/auth/login.usecases");
const profile_dto_1 = require("./../profile/profile.dto");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../common/guards/jwtAuth.guard");
const user_usecases_1 = require("../../../usecases/user/user.usecases");
const user_dto_1 = require("./user.dto");
const user_data_1 = require("../../common/user.data");
const profile_usecases_1 = require("src/usecases/profile/profile.usecases");
const email_service_1 = require("../../services/emails/email.service");
const catch_async_1 = require("../../../utils/catch-async");
const permission_usecases_1 = require("../../../usecases/auth/permission.usecases");
let UserController = class UserController {
    constructor(userUseCases, profileUseCases, loginUsecaseProxy, authorizationUseCases, emailService, permissionUsecase) {
        this.userUseCases = userUseCases;
        this.profileUseCases = profileUseCases;
        this.loginUsecaseProxy = loginUsecaseProxy;
        this.authorizationUseCases = authorizationUseCases;
        this.emailService = emailService;
        this.permissionUsecase = permissionUsecase;
    }
    async createUser(user, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const newuser = await this.userUseCases.createUser(user);
            res.status(201).json(newuser);
        })(req, res, next);
    }
    async createUserWithRole(user, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const alreadyExists = await this.userUseCases.checkUser(user.email);
            if (alreadyExists) {
                throw new common_1.HttpException('User Already Exists', common_1.HttpStatus.CONFLICT);
            }
            const role = await this.authorizationUseCases.getRole(user.role);
            if (!role) {
                throw new common_1.HttpException('Role Does Not Exists', common_1.HttpStatus.NOT_FOUND);
            }
            const newUser = await this.userUseCases.createAdmin({
                email: user.email,
                password: user.password,
            });
            const user_with_profile = await this.profileUseCases.createProfile({
                phone: user.phone,
            }, newUser.id);
            await this.authorizationUseCases.createUserRoles(newUser.id, {
                roles: [user.role],
            });
            return res.json({
                user: user_with_profile,
            });
        })(req, res, next);
    }
    async getMe(req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const user = await this.userUseCases.getUser(user_data_1.UserData.getUserData().id);
            let is_stripe_account = false;
            try {
                is_stripe_account = true;
            }
            catch (e) {
                is_stripe_account = false;
            }
            const { permissions, roles } = await this.permissionUsecase.getOrSetUserPermissionsFromCache(user.id);
            res.json(Object.assign(Object.assign({}, user), { permissions,
                roles,
                is_stripe_account }));
        })(req, res, next);
    }
    async getUser(id, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const user = await this.userUseCases.getUser(id);
            res.json(user);
        })(req, res, next);
    }
    async getUserStats(req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const ss = this.userUseCases.getUserStats();
            res.json(ss);
        })(req, res, next);
    }
    async getLoggenInUser(req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const ss = this.userUseCases.getUser(user_data_1.UserData.getUserData().id);
            res.json(ss);
        })(req, res, next);
    }
    async banUsers(body, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const results = await this.userUseCases.banUsers(body.ids);
            return res.json({
                successfulIds: results.successfulIds,
                failedIds: results.failedIds,
            });
        })(req, res, next);
    }
    async unbanUsers(body, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const results = await this.userUseCases.unbanUsers(body.ids);
            return res.json({
                successfulIds: results.successfulIds,
                failedIds: results.failedIds,
            });
        })(req, res, next);
    }
    async deleteUsers(body, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const results = await this.userUseCases.deleteUsers(body.ids);
            const loggedInUser = await this.userUseCases.getUser(user_data_1.UserData.getUserData().id, true);
            return res.json({
                successfulIds: results.successfulIds,
                failedIds: results.failedIds,
            });
        })(req, res, next);
    }
    async getUsers(query, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            if (!query.sort) {
                query.sort = '-created_at';
            }
            const users = await this.userUseCases.getUsers(query);
            return res.json({
                results: users.data.length,
                users: users.data,
                stats: users.stats,
            });
        })(req, res, next);
    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    async updateMe(body, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const loggedInUser = await this.userUseCases.getUser(user_data_1.UserData.getUserData().id, true);
            const profileId = loggedInUser.profile;
            const result = await this.profileUseCases.updateProfile(profileId.id, body);
            let message = '';
            let user = null;
            if (body.email) {
                const users = await this.userUseCases.getUsers({ email: body.email });
                if (users.data.length > 0) {
                    throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
                }
                const code = this.randomIntFromInterval(1000, 9999);
                const email2FA = await this.emailService.sendEmail2FA(body.email, code);
                this.userUseCases.setCacheCode(code, body.email);
                if (!email2FA) {
                    throw new common_1.HttpException('Could not send email', common_1.HttpStatus.BAD_REQUEST);
                }
                user = await this.userUseCases.updateUser(loggedInUser.id, {
                    email: body.email,
                    is_active: false,
                });
                req.user = user;
                message =
                    'Profile and Email updated successfully, please check your email for the 2FA code';
            }
            else {
                user = await this.userUseCases.getUser(loggedInUser.id, false);
                message = 'Profile updated successfully';
            }
            let is_stripe_account = false;
            try {
                is_stripe_account = true;
            }
            catch (e) {
                is_stripe_account = false;
            }
            return res.json({
                status: 'success',
                user: Object.assign(Object.assign({}, user), { is_stripe_account }),
                message,
            });
        })(req, res, next);
    }
    async updateUser(id, user, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const newuser = await this.userUseCases.updateUser(id, user);
            res.json(newuser);
        })(req, res, next);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateAdminDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserWithRole", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('stats/all'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Get)('loggedIn/data'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getLoggenInUser", null);
__decorate([
    (0, common_1.Patch)('/ban'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.banUserDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "banUsers", null);
__decorate([
    (0, common_1.Patch)('/unban'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.banUserDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unbanUsers", null);
__decorate([
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.banUserDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUsers", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Patch)('/me'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.UpdateProfileDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __param(4, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UpdateUserDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof user_usecases_1.UserUseCases !== "undefined" && user_usecases_1.UserUseCases) === "function" ? _a : Object, typeof (_b = typeof profile_usecases_1.ProfilesUseCases !== "undefined" && profile_usecases_1.ProfilesUseCases) === "function" ? _b : Object, login_usecases_1.LoginUseCases,
        authorization_usecases_1.AuthorizationUseCases,
        email_service_1.MailService,
        permission_usecases_1.PermissionsUseCases])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map