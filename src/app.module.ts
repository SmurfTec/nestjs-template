import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { UsecasesModule } from './usecases/usecase.module';
import { APP_GUARD } from '@nestjs/core';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule } from './infrastructure/services/jwt/jwt.module';
import { ControllerModule } from './infrastructure/controllers/controller.module';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';
import { CustomClsModule } from './infrastructure/services/cls/cls.module';
import { JwtAuthGuard } from './infrastructure/common/guards/jwtAuth.guard';
import { JwtRefreshTokenStrategy } from './infrastructure/common/strategies/jwtRefresh.strategy';
import { LocalStrategy } from './infrastructure/common/strategies/local.strategy';
import { VerifyUserStrategy } from './infrastructure/common/strategies/verify-user.strategy';
import { EmailModule } from './infrastructure/emails/email.module';
import { CacheMangerModule } from './infrastructure/common/caching/cache-manager.module';
import { JobsModule } from './infrastructure/services/jobs/jobs.module';
import { GoogleAuthGuard } from './infrastructure/common/guards/googleAuth.gaurd';
import { GoogleStrategy } from './infrastructure/common/strategies/google.strategy';
import { AppleAuthGuard } from './infrastructure/common/guards/appleAuth.gaurd';
import { AppleStrategy } from './infrastructure/common/strategies/apple.strategy';
import { NotificationModule } from './infrastructure/services/notifications/notification.module';

@Module({
  imports: [
    JwtModule,
    BcryptModule,
    CacheMangerModule,
    EmailModule,
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    ControllerModule,
    RepositoryModule,
    UsecasesModule,
    CustomClsModule,
    JobsModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [
    LocalStrategy,
    VerifyUserStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // GoogleAuthGuard,
    // GoogleStrategy,
    // AppleAuthGuard,
    // AppleStrategy,
  ],
})
export class AppModule {}
