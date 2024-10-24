import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
// import { UpdateRoleModel } from 'src/domain/models/authorization';
import { UserData } from 'src/infrastructure/common/user.data';
import { AuthRolePermissionDto } from 'src/infrastructure/controllers/auth/dtos/auth-role-permission.dto';
import { AuthRoleDto } from 'src/infrastructure/controllers/auth/dtos/auth-role.dto';
import { AuthUserPermissionsDto } from 'src/infrastructure/controllers/auth/dtos/auth-user-permissions.dto';
import { AuthUserRoleDto } from 'src/infrastructure/controllers/auth/dtos/auth-user-roles.dto';
// import { AuthPermissionsRepository } from 'src/infrastructure/repository/auth-permissions.repository';
// import { AuthRolePermissionsRepository } from 'src/infrastructure/repository/auth-role-permissions.repository';
// import { AuthRolesRepository } from 'src/infrastructure/repository/auth-roles.repository';
// import { AuthUserPermissionsRepository } from 'src/infrastructure/repository/auth-user-permissions.repository';
// import { AuthUserRolesRepository } from 'src/infrastructure/repository/auth-user-roles.repository';
import { CacheService } from 'src/infrastructure/services/cache.service';
import { checkExistingPermissions } from 'src/infrastructure/util/utility-functions';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthorizationUseCases {
  // constructor(
  //   private dataSource: DataSource,
  //   private cacheService: CacheService,
  //   private authPermissionsRepository: AuthPermissionsRepository,
  //   private authUserPermissionsRepository: AuthUserPermissionsRepository,
  //   private authRoleRepository: AuthRolesRepository,
  //   private authUserRolesRepository: AuthUserRolesRepository,
  //   private authRolePermissionsRepository: AuthRolePermissionsRepository,
  // ) {}
  // async createRole(authRoleDto: AuthRoleDto) {
  //   const role = await this.authRoleRepository.getRoleByName(authRoleDto.name);
  //   if (role)
  //     throw new HttpException('Role Already exists', HttpStatus.CONFLICT);
  //   const userId = UserData.getUserData().id;
  //   return await this.authRoleRepository.createRole({
  //     ...authRoleDto,
  //     created_by: userId,
  //   });
  // }
  // async getRoles() {
  //   return { data: await this.authRoleRepository.getRoles() };
  // }
  // async getRole(name) {
  //   return { data: await this.authRoleRepository.getRole(name) };
  // }
  // async deleteRole(role: string) {
  //   return await this.authRoleRepository.deleteRole(role);
  // }
  // async getUsersByRole(role: string) {
  //   return {
  //     data: await this.authUserRolesRepository.getUsersByRole(role),
  //   };
  // }
  // async updateRole(role: string, authRoleDto: UpdateRoleModel) {
  //   return await this.authRoleRepository.updateRole(role, {
  //     ...authRoleDto,
  //   });
  // }
  // async createRolePermissions(
  //   role: string,
  //   authRolePermissionsDto: AuthRolePermissionDto,
  // ) {
  //   const rolePermissions = [];
  //   const userId = UserData.getUserData().id;
  //   const existingRolePermissions =
  //     await this.authRolePermissionsRepository.getRolePermissions(role);
  //   checkExistingPermissions(
  //     existingRolePermissions.map(
  //       (rolePermissions) => rolePermissions.permissions,
  //     ),
  //     authRolePermissionsDto.permissions,
  //   );
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.startTransaction();
  //   try {
  //     for (const permission of authRolePermissionsDto.permissions) {
  //       rolePermissions.push(
  //         await this.authRolePermissionsRepository.createRolePermissions(
  //           {
  //             role: role,
  //             permissions: permission,
  //             created_by: userId,
  //           },
  //           queryRunner.manager,
  //         ),
  //       );
  //     }
  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  //   return rolePermissions;
  // }
  // async updateRolePermissions(
  //   role: string,
  //   authRolePermissionsDto: AuthRolePermissionDto,
  // ) {
  //   const rolePermissions = [];
  //   const userId = UserData.getUserData().id;
  //   const existingRolePermissions =
  //     await this.authRolePermissionsRepository.getRolePermissionsNew(role);
  //   // * Remove the permissions that are not in the new list
  //   let permissionsToRemove: string[] = existingRolePermissions
  //     .filter(
  //       (rolePermission) =>
  //         !authRolePermissionsDto.permissions.includes(
  //           rolePermission.permissions,
  //         ),
  //     )
  //     .map((rolePermission) => rolePermission.permissions);
  //   // * Add the permissions that are not in the old list
  //   const permissionsToAdd = authRolePermissionsDto.permissions.filter(
  //     (permission) =>
  //       !existingRolePermissions
  //         .map((rolePermission) => rolePermission.permissions)
  //         .includes(permission),
  //   );
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.startTransaction();
  //   try {
  //     // * Remove the permissions that are not in the new list
  //     if (permissionsToRemove.length > 0) {
  //       await this.authRolePermissionsRepository.deleteRolePermissions(
  //         role,
  //         permissionsToRemove,
  //         queryRunner.manager,
  //       );
  //     }
  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  //   // * Add the permissions that are not in the old list
  //   if (permissionsToAdd.length > 0) {
  //     checkExistingPermissions(
  //       existingRolePermissions.map(
  //         (rolePermissions) => rolePermissions.permissions,
  //       ),
  //       permissionsToAdd,
  //     );
  //   }
  //   const queryRunner2 = this.dataSource.createQueryRunner();
  //   await queryRunner2.startTransaction();
  //   try {
  //     await this.authRolePermissionsRepository.createRolePermissionsBulk(
  //       permissionsToAdd.map((permission) => ({
  //         role: role,
  //         permissions: permission,
  //         created_by: userId,
  //       })),
  //       queryRunner2.manager,
  //     );
  //     await queryRunner2.commitTransaction();
  //   } catch (error) {
  //     await queryRunner2.rollbackTransaction();
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  //   return rolePermissions;
  // }
  // async getRolePermissions(role: string) {
  //   return {
  //     data: await this.authRolePermissionsRepository.getRolePermissions(role),
  //   };
  // }
  // async createUserRoles(id: number, authUserRolesDto: AuthUserRoleDto) {
  //   console.log('authUserRolesDto', authUserRolesDto);
  //   const key = id + '.permissions';
  //   const created_by = UserData.getUserData()?.id || null;
  //   const userRoles = [];
  //   const existingUserRoles =
  //     await this.authUserRolesRepository.getAuthUserRoles(id);
  //   console.log('existingUserRoles', existingUserRoles);
  //   // checkExistingPermissions(
  //   //   existingUserRoles.map((userRoles) => userRoles.role),
  //   //   authUserRolesDto.roles,
  //   // );
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.startTransaction();
  //   try {
  //     // * delete existing roles
  //     const deleteRoles = existingUserRoles.map((userRoles) => userRoles.role);
  //     console.log('deleteRoles', deleteRoles);
  //     await this.authUserRolesRepository.deleteAuthUserRole(
  //       id,
  //       deleteRoles,
  //       queryRunner.manager,
  //     );
  //     for (const role of authUserRolesDto.roles) {
  //       userRoles.push(
  //         await this.authUserRolesRepository.createAuthUserRoles(
  //           { role, user_id: id, created_by },
  //           queryRunner.manager,
  //         ),
  //       );
  //     }
  //     await queryRunner.commitTransaction();
  //     // await this.cacheService.delete(key);
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  //   return userRoles;
  // }
  // async getUserRoles(userId: number) {
  //   return {
  //     data: await this.authUserRolesRepository.getAuthUserRoles(userId),
  //   };
  // }
  // async deleteUserRole(id: number, roles: string[]) {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   queryRunner.startTransaction();
  //   try {
  //     const data = await this.authUserRolesRepository.deleteAuthUserRole(
  //       id,
  //       roles,
  //       queryRunner.manager,
  //     );
  //     queryRunner.commitTransaction();
  //     return data;
  //   } catch (e) {
  //     queryRunner.rollbackTransaction();
  //   }
  // }
  // async getPermissions() {
  //   return { data: await this.authPermissionsRepository.getPermissions() };
  // }
  // async createUserPermissions(
  //   id: number,
  //   authUserPermisisonsDto: AuthUserPermissionsDto,
  // ) {
  //   const userPermissions = [];
  //   const created_by = UserData.getUserData().id;
  //   const existingUserPermissions =
  //     await this.authUserPermissionsRepository.getAuthUserPermissions(id);
  //   // checkExistingPermissions(
  //   //   existingUserPermissions.map((permissions) => permissions.permissions),
  //   //   authUserPermisisonsDto.permissions,
  //   // );
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.startTransaction();
  //   try {
  //     await this.authUserPermissionsRepository.deleteAuthUserPermissionsByUserId(
  //       id,
  //       queryRunner.manager,
  //     );
  //     for (const permission of authUserPermisisonsDto.permissions) {
  //       userPermissions.push(
  //         await this.authUserPermissionsRepository.createAuthUserPermissions(
  //           {
  //             permissions: permission,
  //             created_by,
  //             user_id: id,
  //             is_allow: true,
  //           },
  //           queryRunner.manager,
  //         ),
  //       );
  //     }
  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  //   return userPermissions;
  // }
  // async getUserPermissions(userId: number) {
  //   return {
  //     data: await this.authUserPermissionsRepository.getAuthUserPermissions(
  //       userId,
  //     ),
  //   };
  // }
  // async deleteUserPermission(id: number, permissions: string[]) {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   queryRunner.startTransaction();
  //   try {
  //     const data =
  //       await this.authUserPermissionsRepository.deleteAuthUserPermissions(
  //         id,
  //         permissions,
  //         queryRunner.manager,
  //       );
  //     queryRunner.commitTransaction();
  //     return data;
  //   } catch (e) {
  //     queryRunner.rollbackTransaction();
  //   }
  // }
}
