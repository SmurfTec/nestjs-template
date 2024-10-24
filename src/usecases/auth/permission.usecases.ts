import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/infrastructure/services/cache.service';
// import { AuthUserPermissionsRepository } from 'src/infrastructure/repository/auth-user-permissions.repository';
// import { AuthUserRolesRepository } from 'src/infrastructure/repository/auth-user-roles.repository';

@Injectable()
export class PermissionsUseCases {
  // constructor(
  //   private readonly authUserRolesRepository: AuthUserRolesRepository,
  //   private readonly authUserPermissionsRepository: AuthUserPermissionsRepository,
  //   private readonly cacheSerivce: CacheService,
  // ) {}
  // async getUserPermissionsByRole(userId: number) {
  //   return await this.authUserRolesRepository.getUserRolePermissions(userId);
  // }
  // async getUserPermissionsByUserId(userId: number) {
  //   return await this.authUserPermissionsRepository.getAuthUserPermissions(
  //     userId,
  //   );
  // }
  // async getUserPermissionsAndRoles(userId: number) {
  //   const set = new Set();
  //   const roleSet = new Set();
  //   (await this.getUserPermissionsByRole(userId)).forEach((permission) => {
  //     set.add(permission.permissions);
  //     roleSet.add(permission.roles);
  //   });
  //   (await this.getUserPermissionsByUserId(userId)).forEach((permission) => {
  //     if (!set.has(permission.permissions) && permission.is_allow) {
  //       set.add(permission.permissions);
  //     } else if (set.has(permission.permissions) && !permission.is_allow) {
  //       set.delete(permission.permissions);
  //     }
  //   });
  //   return { permissions: Array.from(set), roles: Array.from(roleSet) };
  // }
  // async getOrSetUserPermissionsFromCache(userId: number): Promise<any> {
  //   const key = userId + '.permissions';
  //   if (await this.cacheSerivce.has(key)) {
  //     await this.cacheSerivce.getKeysByPattern(key);
  //     return await this.cacheSerivce.hmget(key);
  //   } else {
  //     const { permissions, roles } = await this.getUserPermissionsAndRoles(
  //       userId,
  //     );
  //     await this.cacheSerivce.hmset(
  //       key,
  //       { permissions, roles },
  //       60 * 60 * 24 * 7,
  //     );
  //     return { permissions, roles };
  //   }
  // }
}
