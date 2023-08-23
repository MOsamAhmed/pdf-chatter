import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AUTHORIZATION_HEADER_KEY } from './constants';
import { INestApplication } from '@nestjs/common';

export function SwaggerInitializer(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Base-BE-MongoDB')
    .setDescription('Boilerplate of NestJs BE with MongoDB')
    .setVersion('1.0')
    .addSecurity(AUTHORIZATION_HEADER_KEY, {
      type: 'apiKey',
      description: 'Api Authorization',
      name: AUTHORIZATION_HEADER_KEY,
      in: 'header',
    })
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, swaggerDocument);
}
