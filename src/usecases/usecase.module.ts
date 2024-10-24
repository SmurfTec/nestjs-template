import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [],
  exports: [],
})
export class UseCaseModule {}
