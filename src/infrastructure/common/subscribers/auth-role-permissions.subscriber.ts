import { Injectable } from '@nestjs/common';
import { AuthRolePermissions } from 'src/infrastructure/entities/auth-role-permissions.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { CacheEnums } from '../enums/cache.enums';
import { CacheService } from '../../services/cache.service';

@Injectable()
@EventSubscriber()
export class AuthRolePermissionsSubscriber
  implements EntitySubscriberInterface<AuthRolePermissions>
{
  constructor(
    private readonly datasource: DataSource,
    private readonly cacheService: CacheService,
  ) {
    this.datasource.subscribers.push(this);
  }

  listenTo(): string | Function {
    return AuthRolePermissions;
  }

  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    return this.cacheService.deleteByKeyPattern(CacheEnums.LOGIN_PERMISSIONS);
  }
}
