import { Module } from '@nestjs/common';
import { PdfChatbotController } from './pdf-chatbot.controller';
import { PdfChatbotService } from './pdf-chatbot.service';

@Module({
  controllers: [PdfChatbotController],
  providers: [PdfChatbotService]
})
export class PdfChatbotModule {}
