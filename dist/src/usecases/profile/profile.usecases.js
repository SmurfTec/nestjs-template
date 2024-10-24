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
exports.ProfilesUseCases = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../infrastructure/repository/user.repository");
const typeorm_1 = require("typeorm");
const profile_repository_1 = require("../../infrastructure/repository/profile.repository");
const user_usecases_1 = require("../user/user.usecases");
let ProfilesUseCases = class ProfilesUseCases {
    constructor(ProfilesRepository, userRepository, userUsecases, dataSource) {
        this.ProfilesRepository = ProfilesRepository;
        this.userRepository = userRepository;
        this.userUsecases = userUsecases;
        this.dataSource = dataSource;
        this.random = (length = 8) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let str = '';
            for (let i = 0; i < length; i++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return str;
        };
    }
    async createProfile(ProfileModel, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        queryRunner.startTransaction();
        try {
            const Profile = await this.ProfilesRepository.createProfile(Object.assign(Object.assign({}, ProfileModel), { user: userId }));
            await queryRunner.manager.save(Profile);
            await queryRunner.commitTransaction();
            return Profile;
        }
        catch (e) {
            queryRunner.rollbackTransaction();
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
        finally {
            await queryRunner.release();
        }
    }
    async createProfileGoogle(ProfileModel, email, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        queryRunner.startTransaction();
        try {
            const Profile = await this.ProfilesRepository.createProfile(Object.assign({}, ProfileModel), queryRunner.manager);
            const user = await this.userUsecases.updateUser(userId, { profile: Profile.id }, queryRunner.manager);
            queryRunner.commitTransaction();
            return user;
        }
        catch (e) {
            queryRunner.rollbackTransaction();
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getProfile(id) {
        const data = await this.ProfilesRepository.getProfile(id);
        if (!data) {
            throw new common_1.HttpException('Profile Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data };
    }
    async getProfiles() {
        return await this.ProfilesRepository.getProfiles();
    }
    async updateProfile(id, profileUpdateModel) {
        return await this.ProfilesRepository.updateProfile(id, profileUpdateModel);
    }
    async deleteProfile(id) {
        return await this.ProfilesRepository.deleteProfile(id);
    }
};
ProfilesUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_repository_1.ProfilesRepository,
        user_repository_1.UserRepository,
        user_usecases_1.UserUseCases,
        typeorm_1.DataSource])
], ProfilesUseCases);
exports.ProfilesUseCases = ProfilesUseCases;
//# sourceMappingURL=profile.usecases.js.map