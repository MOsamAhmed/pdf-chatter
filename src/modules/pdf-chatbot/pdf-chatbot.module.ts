import { Module } from '@nestjs/common';
import { PdfChatbotController } from './pdf-chatbot.controller';
import { PdfChatbotService } from './pdf-chatbot.service';
import { AxiosApiCallerModule } from '../axios-api-caller/axios-api-caller.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TextDataModel,
  TextDataModelSchema,
} from './entities/text-data.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TextDataModel.name, schema: TextDataModelSchema },
    ]),
    AxiosApiCallerModule,
  ],
  controllers: [PdfChatbotController],
  providers: [PdfChatbotService],
})
export class PdfChatbotModule {}
