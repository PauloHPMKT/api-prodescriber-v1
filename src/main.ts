import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app
    .listen(3003)
    .then(() =>
      logger.log('[PRO_DESCRIBER_API] is running on http://localhost:3003'),
    );
}
bootstrap();
