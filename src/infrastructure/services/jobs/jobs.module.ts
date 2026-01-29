import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { JobService } from './jobs.service';
import { UsecasesModule } from 'src/usecases/usecase.module';
import { CacheMangerModule } from 'src/infrastructure/common/caching/cache-manager.module';
import { CacheService } from 'src/infrastructure/common/caching/cache.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsecasesModule,
    CacheMangerModule,
    // DlmModule,
  ],
  providers: [JobService, CacheService],
  exports: [JobService],
})
export class JobsModule {}
