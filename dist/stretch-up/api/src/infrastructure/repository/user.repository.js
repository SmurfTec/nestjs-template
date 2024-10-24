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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_1 = require("../../domain/models/user");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_service_1 = require("../services/bcrypt/bcrypt.service");
const api_features_1 = require("../common/api-features");
let UserRepository = class UserRepository {
    constructor(userRepository, bcryptService) {
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
    }
    async updateRefreshToken(email, refreshToken) {
    }
    async getUsersByRole(role) {
        const users = await this.userRepository.query(`SELECT c1.* FROM users c1
       LEFT JOIN auth_user_roles c2 ON c1.id = c2.user_id
       WHERE c2.role = '${role}'`);
        return users;
    }
    async getWalletStats() {
        const available_withdrawn = await this.userRepository.query(`
      SELECT SUM(c2.available_funds) AS available_withdrawn
      FROM users c1
      LEFT JOIN profiles c2 ON c1.profile = c2.id
      `);
        return {
            available_withdrawn: +available_withdrawn[0].available_withdrawn,
        };
    }
    async deleteUsers(userIds) {
        const successfulIds = [];
        const failedIds = [];
        for (const id of userIds) {
            try {
                const result = await this.userRepository.delete(id);
                if (result.affected > 0) {
                    successfulIds.push(id);
                }
                else {
                    failedIds.push(id);
                }
            }
            catch (error) {
                console.error(`Error updating user with ID ${id}:`, error);
                failedIds.push(id);
            }
        }
        return { successfulIds, failedIds };
    }
    async banUsers(userIds) {
        const successfulIds = [];
        const failedIds = [];
        for (const id of userIds) {
            try {
                const result = await this.userRepository.update(id, {
                    is_banned: true,
                });
                if (result.affected > 0) {
                    successfulIds.push(id);
                }
                else {
                    failedIds.push(id);
                }
            }
            catch (error) {
                console.error(`Error updating user with ID ${id}:`, error);
                failedIds.push(id);
            }
        }
        return { successfulIds, failedIds };
    }
    async unbanUsers(userIds) {
        const successfulIds = [];
        const failedIds = [];
        for (const id of userIds) {
            try {
                const result = await this.userRepository.update(id, {
                    is_banned: false,
                });
                if (result.affected > 0) {
                    successfulIds.push(id);
                }
                else {
                    failedIds.push(id);
                }
            }
            catch (error) {
                console.error(`Error updating user with ID ${id}:`, error);
                failedIds.push(id);
            }
        }
        return { successfulIds, failedIds };
    }
    async getActiveUserByEmail(email) {
        const adminUserEntity = await this.userRepository.findOne({
            where: {
                email: email.toLowerCase(),
                is_active: true,
            },
        });
        if (!adminUserEntity) {
            return null;
        }
        return adminUserEntity;
    }
    async getUserByEmail(email) {
        const adminUserEntity = await this.userRepository.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (!adminUserEntity) {
            return null;
        }
        return adminUserEntity;
    }
    async getUserByCode(code) {
        const adminUserEntity = await this.userRepository.findOne({
            where: {
                signup_otp: code,
            },
        });
        if (!adminUserEntity) {
            return null;
        }
        return adminUserEntity;
    }
    async updateLastLogin(email) {
        await this.userRepository.update({
            email: email,
        }, { last_login: () => 'CURRENT_TIMESTAMP' });
    }
    toUser(adminUserEntity) {
        const adminUser = new user_1.UserModel();
        adminUser.id = adminUserEntity.id;
        adminUser.email = adminUserEntity.email;
        adminUser.password = adminUserEntity.password;
        return adminUser;
    }
    toUserEntity(adminUser) {
        const adminUserEntity = new user_entity_1.Users();
        adminUserEntity.email = adminUser.email;
        adminUserEntity.password = adminUser.password;
        return adminUserEntity;
    }
    async createUser(userModel) {
        userModel.password = await this.bcryptService.hash(userModel.password);
        const createdUser = await this.userRepository.save(Object.assign(Object.assign({}, userModel), { email: userModel.email.toLowerCase() }));
        return createdUser;
    }
    getUser(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    viewAdmin(id) {
        return this.userRepository.query(`
      SELECT c1.* ,
      c2.role as role,
      c2.created_on as assigned_on,
      (
        SELECT json_build_object(
          'id', c21.id,
          'firstname' , c21.firstname,
'lastname' , c21.lastname,
'coins' , c21.coins,
          'mobile_no' , c21.mobile_no,
          'image_url' , c21.image_url
        )
        FROM profiles c21
        WHERE c21.id = c1.profile
      ) as profile ,

        (
        SELECT json_agg(json_build_object(
          'message', c5.message,
          'type', c5.type,
          'created_on', c5.created_on,
          'image' , c6.filename
        ))
        FROM user_activitys c5
        LEFT JOIN attachments c6 on c6.table = 'user_activitys' and c6.type_of = c5.type
        WHERE c5.user = c1.id
      ) AS user_activities
       

      FROM users c1
      LEFT JOIN auth_user_roles c2 ON c2.user_id = c1.id
      WHERE c1.id = ${id}
      
      `);
    }
    getEmployee(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['profile'],
        });
    }
    getCustomer(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async getUserStats() {
        const total_users = await this.userRepository.find({
            select: ['id', 'created_on'],
        });
        const total_users_this_month = await this.userRepository.query(`
      SELECT count(*) as total_users_this_month
      FROM users
      WHERE created_on >= date_trunc('month', CURRENT_DATE)
      `);
        const total_users_last_month = await this.userRepository.query(`
      SELECT count(*) as total_users_last_month
      FROM users
      WHERE created_on >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
      AND created_on < date_trunc('month', CURRENT_DATE)
      `);
        const total_user_this_year = await this.userRepository.query(`
      SELECT count(*) as total_user_this_year
      FROM users
      WHERE created_on >= date_trunc('year', CURRENT_DATE)
      `);
        const total_user_last_year = await this.userRepository.query(`
      SELECT count(*) as total_user_last_year
      FROM users
      WHERE created_on >= date_trunc('year', CURRENT_DATE - INTERVAL '1 year')
      AND created_on < date_trunc('year', CURRENT_DATE)
      `);
        return {
            total_users: total_users,
            total_users_this_month: total_users_this_month[0].total_users_this_month,
            total_users_last_month: total_users_last_month[0].total_users_last_month,
            total_user_this_year: total_user_this_year[0].total_user_this_year,
            total_user_last_year: total_user_last_year[0].total_user_last_year,
        };
    }
    async getUsers(queryparams) {
        const apiFeatures = new api_features_1.default({
            query: `
      SELECT c1.* ,
      c2.role as role,
      (
        SELECT json_build_object(
          'id', c21.id,
          'phone', c21.phone,
          'upcoming_phone', c21.upcoming_phone,
          'upcoming_phone_otp', c21.upcoming_phone_otp,
          'upcoming_phone_otp_expiry', c21.upcoming_phone_otp_expiry,
          'document_front', c21.document_front,
          'document_back', c21.document_back,
          'photo', c21.photo,
        ) AS profile
        FROM profiles c21
        WHERE c21.id = c1.profile
      ) 

      from users c1

    LEFT  JOIN auth_user_roles c2 ON c1.id = c2.user_id
      
      `,
            queryString: queryparams,
            queryObjString: 'c1.',
        })
            .filter()
            .sort()
            .paginate();
        const query = apiFeatures.query;
        return await this.userRepository.query(query);
    }
    async getEmployees() {
        return await this.userRepository.find({
            relations: ['profile'],
        });
    }
    getCustomers() {
        return this.userRepository.find();
    }
    async updateUser(id, userModel, manager = null) {
        if (userModel.password)
            userModel.password = await this.bcryptService.hash(userModel.password);
        if (manager) {
            let user = await manager.getRepository(user_entity_1.Users).findOne({ where: { id } });
            if (user) {
                user = Object.assign(Object.assign({}, user), userModel);
                const createdUser = await manager.getRepository(user_entity_1.Users).save(user);
                return await this.userRepository.findOne({
                    where: { id: createdUser.id },
                });
            }
        }
        else {
            let user = await this.userRepository.findOne({ where: { id } });
            if (user) {
                user = Object.assign(Object.assign({}, user), userModel);
                const createdUser = await this.userRepository.save(user);
                return await this.userRepository.findOne({
                    where: { id: createdUser.id },
                });
            }
        }
    }
    async deleteUser(id) {
        const deletedUser = await this.userRepository.delete(id);
        if (deletedUser.affected === 0) {
            throw new Error('User not found');
        }
        return;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        bcrypt_service_1.BcryptService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map