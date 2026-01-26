import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/infrastructure/common/caching/cache.service';

@Injectable()
export class JobService {
  constructor(private cacheService: CacheService) {}
}
