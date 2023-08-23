import { Module } from '@nestjs/common';
import { PdfChatbotController } from './pdf-chatbot.controller';
import { PdfChatbotService } from './pdf-chatbot.service';
import { AxiosApiCallerModule } from '../axios-api-caller/axios-api-caller.module';

@Module({
  imports: [AxiosApiCallerModule],
  controllers: [PdfChatbotController],
  providers: [PdfChatbotService],
})
export class PdfChatbotModule {}
