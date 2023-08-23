import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerInitializer } from './helpers/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Custom Code
  SwaggerInitializer(app);

  await app.listen(3000);
}
bootstrap();

// <<<URGENT>>>
// 1) DONE - Swagger integrate
// 2) Done - update user
// 3) Done - user me call - update last login
// 4) Done - reset password
// 5) Done - dotenv package
// 6) typeorm db initializer
// 7) typeorm migrations
// 8) sendgrid for emailing
// 9) forgot password - delete all logins
// 11) cron module
// 12) cron auth token remover 30 days
// 13) Done - Authorize decorator

// ---LATER---
// 1) user listing
