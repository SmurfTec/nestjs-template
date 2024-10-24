import { diskStorage } from 'multer';
import { Module } from '@nestjs/common';

import { MyLogger } from '../common/logger/myLogger';
import { MulterModule } from '@nestjs/platform-express';
import { EmailModule } from 'src/infrastructure/services/emails/email.module';
import { UseCaseModule } from 'src/usecases/usecase.module';

@Module({
  imports: [
    UseCaseModule,
    MulterModule.register({
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
          if (
            !(
              file.mimetype == 'image/png' ||
              file.mimetype == 'image/jpg' ||
              file.mimetype == 'image/jpeg'
            )
          ) {
            return cb(new Error('Filetype must be png,jpg or jpeg'), '');
          }

          const filename =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            '-' +
            file.originalname;
          cb(null, filename);
        },
      }),
      // dest: './uploads',
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [MyLogger, EmailModule],
})
export class ControllerModule {}
