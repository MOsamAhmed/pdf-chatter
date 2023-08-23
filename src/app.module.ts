import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MediaModule } from './modules/media/media.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppEnv } from './helpers/env.helper';
import { AxiosApiCallerModule } from './modules/axios-api-caller/axios-api-caller.module';
import { PdfChatbotModule } from './modules/pdf-chatbot/pdf-chatbot.module';

@Module({
  imports: [
    MongooseModule.forRoot(AppEnv('MONGOOSE_CONNECTION_STRING', ''), {
      dbName: AppEnv('MONGOOSE_DB_NAME', 'test'),
    }),
    AxiosApiCallerModule,
    AuthModule,
    MediaModule,
    PdfChatbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
