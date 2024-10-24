import { HttpAdapterHost, NestFactory, NestApplication } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './infrastructure/common/exceptions/global-exception-handler';
import helmet from 'helmet';
import { createDocument } from './infrastructure/config/swagger/swagger';

//config
const configSerivce = new EnvironmentConfigService(new ConfigService());

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.enableCors({
    origin: true,
    credentials: true,
  });
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  
  // app.disable('x-powered-by');
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.enableCors();
  app.use(helmet());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());

  SwaggerModule.setup('api', app, createDocument(app));

  await app.listen(configSerivce.getPORT() || 3010, () => {
    console.log(`app is listening on port ${configSerivce.getPORT()}`);
  });
}
bootstrap();
