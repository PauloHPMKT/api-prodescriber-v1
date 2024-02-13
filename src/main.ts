import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');

  const config = new DocumentBuilder()
    .setTitle('ProDescriber API')
    .setDescription(
      'ProDescriber API is an api for generating descriptions for products to bust sales.',
    )
    .setVersion('1.0')
    .addTag('prodescriber')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app
    .listen(port)
    .then(() =>
      logger.log('[PRO_DESCRIBER_API] is running on http://localhost:3003'),
    );
}
bootstrap();
