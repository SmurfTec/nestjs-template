import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { createDocument } from './infrastructure/config/swagger/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as bodyParser from 'body-parser';
import { setupBullBoard } from './infrastructure/services/bullboard/bullboard';

const envPath = path.resolve(process.cwd(), 'env', '.env');

config({ path: envPath });
const configSerivce = new EnvironmentConfigService(new ConfigService());
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable WebSocket support
  app.useWebSocketAdapter(new IoAdapter(app));
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  ); 
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(
    '/webhooks/stripe',
    bodyParser.raw({ type: 'application/json' }),
  );
  SwaggerModule.setup('docs', app, createDocument(app));

  setupBullBoard(app);

  await app.listen(configSerivce.getPORT(), () => {
    console.log(`listening on port : ${configSerivce.getPORT()}`);
  });
}
bootstrap();
