import { Injectable } from '@nestjs/common';
import { AuthUserRoles } from 'src/infrastructure/entities/auth-user-roles.entity';
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
export class AuthUserRolesSubscriber
  implements EntitySubscriberInterface<AuthUserRoles>
{
  constructor(
    private readonly datasource: DataSource,
    private readonly cacheService: CacheService,
  ) {
    this.datasource.subscribers.push(this);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  listenTo(): string | Function {
    return AuthUserRoles;
  }

  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    return this.cacheService.deleteByKeyPattern(CacheEnums.LOGIN_PERMISSIONS);
  }
}
