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
exports.AuthUserRolesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_user_roles_entity_1 = require("../entities/auth-user-roles.entity");
const typeorm_2 = require("typeorm");
let AuthUserRolesRepository = class AuthUserRolesRepository {
    constructor(entityManager, authUserRolesRepository) {
        this.entityManager = entityManager;
        this.authUserRolesRepository = authUserRolesRepository;
    }
    async createAuthUserRoles(authUserRolesModel, manager) {
        console.log('authUserRolesModel', authUserRolesModel);
        return await manager.getRepository(auth_user_roles_entity_1.AuthUserRoles).save(authUserRolesModel);
    }
    async getAuthUserRoles(userId) {
        console.log('userId', userId);
        return await this.authUserRolesRepository.query(`
      SELECT c1.* 
      from auth_user_roles c1
      WHERE c1.user_id = ${userId}
      `);
    }
    async getUsersByRole(role) {
        return await this.authUserRolesRepository.find({
            where: { role },
        });
    }
    async deleteAuthUserRole(id, roles, manager) {
        for (let i = 0; i < roles.length; i++) {
            const role = await manager.getRepository(auth_user_roles_entity_1.AuthUserRoles).findOne({
                where: { user_id: id, role: roles[i] },
            });
            await manager.getRepository(auth_user_roles_entity_1.AuthUserRoles).remove(role);
        }
        return 'deleted';
    }
    async getUserRolePermissions(userId) {
        return await this.entityManager
            .createQueryBuilder()
            .select('arp.permissions as permissions, arp.role as roles')
            .from('auth_user_roles', 'aur')
            .innerJoin('auth_role_permissions', 'arp', 'arp.role = aur.role')
            .where('aur.user_id = :userId', { userId })
            .getRawMany();
    }
};
AuthUserRolesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(auth_user_roles_entity_1.AuthUserRoles)),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        typeorm_2.Repository])
], AuthUserRolesRepository);
exports.AuthUserRolesRepository = AuthUserRolesRepository;
//# sourceMappingURL=auth-user-roles.repository.js.map