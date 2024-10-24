import { Module } from '@nestjs/common';
import { UseCaseModule } from 'src/usecases/usecase.module';
import { CrudLogsSubscriber } from './crud.logs.subscriber';

@Module({
  imports: [UseCaseModule],
  controllers: [CrudLogsSubscriber],
  providers: [],
  exports: [],
})
export class MicroServiceModule {}
