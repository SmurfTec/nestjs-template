import { AuthRolePermissions } from 'src/infrastructure/entities/auth-role-permissions.entity';
import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { CacheService } from '../../services/cache.service';
export declare class AuthRolePermissionsSubscriber implements EntitySubscriberInterface<AuthRolePermissions> {
    private readonly datasource;
    private readonly cacheService;
    constructor(datasource: DataSource, cacheService: CacheService);
    listenTo(): string | Function;
    afterInsert(event: InsertEvent<any>): void | Promise<any>;
}
