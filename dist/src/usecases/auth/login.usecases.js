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
exports.LoginUseCases = void 0;
const common_1 = require("@nestjs/common");
const environment_config_service_1 = require("../../infrastructure/config/environment-config/environment-config.service");
const user_repository_1 = require("../../infrastructure/repository/user.repository");
const bcrypt_service_1 = require("../../infrastructure/services/bcrypt/bcrypt.service");
const jwt_service_1 = require("../../infrastructure/services/jwt/jwt.service");
const jwt_decode_1 = require("jwt-decode");
const profile_usecases_1 = require("../profile/profile.usecases");
let LoginUseCases = class LoginUseCases {
    constructor(jwtTokenService, jwtConfig, userRepository, profileUsecases, bcryptService) {
        this.jwtTokenService = jwtTokenService;
        this.jwtConfig = jwtConfig;
        this.userRepository = userRepository;
        this.profileUsecases = profileUsecases;
        this.bcryptService = bcryptService;
    }
    async getCookieWithJwtToken(email) {
        const payload = { email };
        const secret = this.jwtConfig.getJwtSecret();
        const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        return token;
    }
    async getCookieWithJwtRefreshToken(email) {
        const payload = { email };
        const secret = this.jwtConfig.getJwtRefreshSecret();
        const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        await this.setCurrentRefreshToken(token, email);
        return token;
    }
    getCookieForAuthCheck() {
        const cookie = `AuthCheck=true; SameSite=None;  Secure=true; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
        return cookie;
    }
    async validateUserForLocalStragtegy(email, pass) {
        const user = await this.userRepository.getActiveUserByEmail(email);
        if (!user) {
            return null;
        }
        const match = await this.bcryptService.compare(pass, user.password);
        if (user && match) {
            await this.updateLoginTime(user.email);
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async validateEmailForLocalStragtegy(email) {
        const user = await this.userRepository.getActiveUserByEmail(email);
        if (!user) {
            return null;
        }
        return user;
    }
    async validateUserForJWTStragtegy(email) {
        const verifEmail = await this.userRepository.getActiveUserByEmail(email);
        if (!verifEmail) {
            return null;
        }
        const user = await this.userRepository.getActiveUserByEmail(email);
        if (!user) {
            return null;
        }
        return user;
    }
    async updateLoginTime(email) {
        await this.userRepository.updateLastLogin(email);
    }
    async setCurrentRefreshToken(refreshToken, email) {
        const currentHashedRefreshToken = await this.bcryptService.hash(refreshToken);
        await this.userRepository.updateRefreshToken(email, currentHashedRefreshToken);
    }
    async getUserIfRefreshTokenMatches(refreshToken, email) {
        const user = await this.userRepository.getActiveUserByEmail(email);
        if (!user) {
            return null;
        }
        const isRefreshTokenMatching = await this.bcryptService.compare(refreshToken, user.hashRefreshToken);
        if (isRefreshTokenMatching) {
            return user;
        }
        return null;
    }
    async signInWithGoogle(credentialToken) {
        try {
            const user = (0, jwt_decode_1.default)(credentialToken);
            const checkUser = await this.userRepository.getUserByEmail(user.email);
            if (checkUser) {
                return { data: checkUser };
            }
            const createdUser = await this.userRepository.createUser({
                email: user.email,
                password: '',
            });
            const completedUser = await this.profileUsecases.createProfileGoogle({
                phone: '',
            }, user.email, createdUser.id);
            return { data: completedUser };
        }
        catch (error) {
            throw new common_1.HttpException('Invalid Google SignIn', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
LoginUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtTokenService,
        environment_config_service_1.EnvironmentConfigService,
        user_repository_1.UserRepository,
        profile_usecases_1.ProfilesUseCases,
        bcrypt_service_1.BcryptService])
], LoginUseCases);
exports.LoginUseCases = LoginUseCases;
//# sourceMappingURL=login.usecases.js.map