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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../common/guards/jwtAuth.guard");
const profile_usecases_1 = require("../../../usecases/profile/profile.usecases");
const profile_dto_1 = require("./profile.dto");
const user_usecases_1 = require("../../../usecases/user/user.usecases");
const user_data_1 = require("../../common/user.data");
let ProfileController = class ProfileController {
    constructor(profileUseCases, userUseCases) {
        this.profileUseCases = profileUseCases;
        this.userUseCases = userUseCases;
    }
    getProfile(id) {
        return this.profileUseCases.getProfile(id);
    }
    getProfiles() {
        return this.profileUseCases.getProfiles();
    }
    async updateProfile(profile) {
        const loggedInUser = await this.userUseCases.getUser(user_data_1.UserData.getUserData().id, true);
        const profileId = loggedInUser.profile;
        const result = await this.profileUseCases.updateProfile(profileId.id, profile);
        return {
            message: 'Profile updated successfully',
            status: 200,
            profile: result,
            user: loggedInUser,
        };
    }
    deleteProfile(id) {
        return this.profileUseCases.deleteProfile(id);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfiles", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "deleteProfile", null);
ProfileController = __decorate([
    (0, common_1.Controller)('profiles'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [profile_usecases_1.ProfilesUseCases,
        user_usecases_1.UserUseCases])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map