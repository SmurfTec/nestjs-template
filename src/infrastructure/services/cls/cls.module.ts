import { Global, Module } from '@nestjs/common';
import { ClsService, ClsModule } from 'nestjs-cls';
import { CustomClsStore } from 'src/domain/cls/cls-service.interface';

export class CustomClsService extends ClsService<CustomClsStore> {}

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  providers: [
    {
      provide: CustomClsService,
      useExisting: ClsService,
    },
  ],
  exports: [CustomClsService],
})
export class CustomClsModule {}
