import { AuthUserRoles } from 'src/infrastructure/entities/auth-user-roles.entity';
import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { CacheService } from '../../services/cache.service';
export declare class AuthUserRolesSubscriber implements EntitySubscriberInterface<AuthUserRoles> {
    private readonly datasource;
    private readonly cacheService;
    constructor(datasource: DataSource, cacheService: CacheService);
    listenTo(): string | Function;
    afterInsert(event: InsertEvent<any>): void | Promise<any>;
}
