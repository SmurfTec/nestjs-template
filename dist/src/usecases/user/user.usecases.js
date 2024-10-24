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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCases = void 0;
const profile_repository_1 = require("./../../infrastructure/repository/profile.repository");
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../infrastructure/services/cache.service");
const email_service_1 = require("../../infrastructure/services/emails/email.service");
const user_repository_1 = require("../../infrastructure/repository/user.repository");
let UserUseCases = class UserUseCases {
    constructor(userRepository, profileRepository, cacheService, emailService) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.cacheService = cacheService;
        this.emailService = emailService;
        this.userTypes = {
            employee: () => this.userRepository.getEmployees(),
            customer: () => this.userRepository.getCustomers(),
        };
        this.transformationTypes = {
            employee: async (data) => {
                return await this.transformEmployeeData(data);
            },
            customer: async (data) => {
                return data;
            },
        };
    }
    async viewAdmin(id) {
        return await this.userRepository.viewAdmin(id);
    }
    async setCacheCode(code, email) {
        await this.cacheService.set('' + code, email, 5 * 60 * 1000);
    }
    async createUser(user) {
        try {
            const checkUser = await this.userRepository.getUserByEmail(user.email);
            if (checkUser) {
                throw new common_1.HttpException('User Already Exists', common_1.HttpStatus.CONFLICT);
            }
            const code = this.randomIntFromInterval(1000, 9999);
            const createdUser = await this.userRepository.createUser(Object.assign(Object.assign({ is_active: false }, user), { signup_otp: code, signup_otp_expiry: new Date(Date.now() + 60 * 5 * 1000) }));
            await this.emailService.sendUserConfirmation(user.email, '' + code);
            return createdUser;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 500);
        }
    }
    async createUserOnConfirmation(code, email, manager = null) {
        const checkUser = await this.userRepository.getUserByEmail(email);
        if (!checkUser) {
            throw new common_1.HttpException(`User Doesn't  Exists`, common_1.HttpStatus.CONFLICT);
        }
        const currentTime = new Date().getTime();
        const otpExpiryTime = new Date(checkUser.signup_otp_expiry).getTime();
        if (checkUser.signup_otp !== code || currentTime > otpExpiryTime) {
            throw new common_1.HttpException(`OTP is invalid or expired`, common_1.HttpStatus.BAD_REQUEST);
        }
        const updateUser = await this.userRepository.updateUser(checkUser.id, {
            is_active: true,
            is_email_verified: true,
            signup_otp: null,
            signup_otp_expiry: null,
        }, manager);
        return updateUser;
    }
    async resendCodeEmail(userEmail) {
        try {
            const checkUser = await this.userRepository.getUserByEmail(userEmail);
            if (!checkUser) {
                throw new common_1.HttpException('User Not Exists', common_1.HttpStatus.CONFLICT);
            }
            const code = this.randomIntFromInterval(1000, 9999);
            await this.userRepository.updateUser(checkUser.id, {
                signup_otp: code,
                signup_otp_expiry: new Date(Date.now() + 60 * 5 * 1000),
            });
            await this.emailService.sendUserConfirmation(checkUser.email, '' + code);
            return checkUser;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 500);
        }
    }
    async sendPhoneCode(phone, email) {
        try {
            const checkUser = await this.userRepository.getUserByEmail(email);
            if (!checkUser) {
                throw new common_1.HttpException(`User Doesn't  Exists`, common_1.HttpStatus.CONFLICT);
            }
            const code = this.randomIntFromInterval(1000, 9999);
            const expiryTime = new Date(Date.now() + 60 * 5 * 1000);
            await this.profileRepository.createProfile({
                phone: phone,
                phone_otp: code,
                phone_otp_expiry: expiryTime,
                user: checkUser.id,
            });
            return code;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 500);
        }
    }
    async createPhoneConfirmation(code, email, manager = null) {
        const checkUser = await this.userRepository.getUserByEmail(email);
        if (!checkUser) {
            throw new common_1.HttpException(`User Doesn't  Exists`, common_1.HttpStatus.CONFLICT);
        }
        const checkProfile = await this.profileRepository.getProfileByCode(code);
        if (!checkProfile)
            throw new common_1.HttpException(`Phone Doesn't  Exists`, common_1.HttpStatus.CONFLICT);
        const currentTime = new Date().getTime();
        const otpExpiryTime = new Date(checkProfile.phone_otp_expiry).getTime();
        if (checkProfile.phone_otp !== code || currentTime > otpExpiryTime) {
            throw new common_1.HttpException(`OTP is invalid or expired`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.userRepository.updateUser(checkUser.id, {
            is_phone_verified: true,
        }, manager);
        const updateprofile = await this.profileRepository.updateProfile(checkProfile.id, {
            phone_otp: null,
            phone_otp_expiry: null,
        });
        return updateprofile;
    }
    async checkUser(userEmail) {
        return await this.userRepository.getUserByEmail(userEmail);
    }
    async createAdmin(user) {
        try {
            const checkUser = await this.userRepository.getUserByEmail(user.email);
            if (checkUser) {
                throw new common_1.HttpException('User Already  Exists', common_1.HttpStatus.CONFLICT);
            }
            const createdUser = await this.userRepository.createUser(Object.assign(Object.assign({}, user), { is_active: true }));
            return createdUser;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 500);
        }
    }
    async banUsers(ids) {
        return await this.userRepository.banUsers(ids);
    }
    async deleteUsers(ids) {
        return await this.userRepository.deleteUsers(ids);
    }
    async unbanUsers(ids) {
        return await this.userRepository.unbanUsers(ids);
    }
    async getUser(id, getProfileId = false) {
        const data = await this.userRepository.getUser(id);
        if (!data) {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return data;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async getUserStats() {
        const users = await this.userRepository.getUserStats();
        return this.userStatsTransformer(users);
    }
    async getUserReveueStats() {
        const users = await this.userRepository.getUserStats();
        return this.userStatsTransformer(users);
    }
    async getUsersByRole(role) {
        const users = await this.userRepository.getUsersByRole(role);
        return users;
    }
    async getUsers(query) {
        const data = await this.userRepository.getUsers(query);
        return { stats: await this.getUserStats(), data };
    }
    async updateUser(id, user, manager = null) {
        return await this.userRepository.updateUser(id, user, manager);
    }
    async transformEmployeeData(employeeData) {
        if (Array.isArray(employeeData)) {
            const employees = [];
            for (let i = 0; i < employeeData.length; i++) {
                employees.push(await this.transformEmployeeObject(employeeData[i]));
            }
            return employees;
        }
        else {
            return await this.transformEmployeeObject(employeeData);
        }
    }
    async forgotPassword(email) {
        try {
            const checkUser = await this.userRepository.getUserByEmail(email);
            if (!checkUser) {
                throw new common_1.HttpException('User does not Exists', common_1.HttpStatus.CONFLICT);
            }
            const code = this.randomIntFromInterval(1000, 9999);
            await this.userRepository.updateUser(checkUser.id, {
                signup_otp: code,
                signup_otp_expiry: new Date(Date.now() + 60 * 5 * 1000),
            });
            await this.emailService.sendUserConfirmation(email, '' + code);
            return 'email sent successfully';
        }
        catch (e) {
            throw new common_1.HttpException(e.message, 500);
        }
    }
    async validateCode(code) {
        const userEmail = await this.cacheService.get(code);
        if (!userEmail) {
            throw new common_1.HttpException('token expired', common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            status: true,
        };
    }
    async getUserEmailByCode(code) {
        const userEmail = await this.cacheService.get(code);
        if (!userEmail) {
            throw new common_1.HttpException('token expired', common_1.HttpStatus.BAD_REQUEST);
        }
        return userEmail;
    }
    async setUsersPassword(code, password) {
        const user = await this.userRepository.getUserByCode(code);
        const currentTime = new Date().getTime();
        const otpExpiryTime = new Date(user.signup_otp_expiry).getTime();
        if (user.signup_otp !== code || currentTime > otpExpiryTime) {
            throw new common_1.HttpException(`OTP is invalid or expired`, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const updatedUser = await this.userRepository.updateUser(user.id, {
                password,
                signup_otp: null,
                signup_otp_expiry: null,
            });
            return updatedUser;
        }
    }
    async transformEmployeeObject(employee) {
        const { id, username, is_active, last_login, employee_id } = employee;
        const { department_id, designation_id, reports_to } = employee_id, restOfEmployeeData = __rest(employee_id, ["department_id", "designation_id", "reports_to"]);
        return {
            id,
            username,
            is_active,
            last_login,
            employee: Object.assign(Object.assign({}, restOfEmployeeData), { designation: designation_id, department: department_id, manager: reports_to }),
        };
    }
    userStatsTransformer({ total_users: data, total_users_this_month, total_users_last_month, total_user_this_year, total_user_last_year, }) {
        const total_users_registered = data.length;
        const miliSecondsInAMonth = 2629800000;
        const miliSecondsInAYear = 31557600000;
        let users_registered_this_month = 0;
        let users_registered_this_year = 0;
        for (let i = 0; i < data.length; i++) {
            if (new Date().getTime() - data[i].created_at.getTime() <=
                miliSecondsInAMonth) {
                users_registered_this_month++;
                users_registered_this_year++;
            }
            else if (new Date().getTime() - data[i].created_at.getTime() <=
                miliSecondsInAYear) {
                users_registered_this_year++;
            }
        }
        return {
            total_users_registered,
            total_users_percentage: ((total_users_this_month - total_users_last_month) /
                total_users_last_month) *
                100,
            users_percentage: ((total_users_this_month - total_users_last_month) /
                total_users_last_month) *
                100,
            total_users_this_month,
            total_users_last_month,
            total_user_this_year,
            users_years_percentage: ((users_registered_this_year - total_user_last_year) /
                total_user_last_year) *
                100,
        };
    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};
UserUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        profile_repository_1.ProfilesRepository,
        cache_service_1.CacheService,
        email_service_1.MailService])
], UserUseCases);
exports.UserUseCases = UserUseCases;
//# sourceMappingURL=user.usecases.js.map