import { Body, Controller, Post } from '@nestjs/common';
import { PdfChatbotService } from './pdf-chatbot.service';
import {
  AskQuestionRequest,
  ChatHistoryRequest,
  ExtractContentRequest,
  GenerateDocumentInfoRequest,
} from './pdf-chatbot.request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pdf-chatbot')
@Controller('pdf-chatbot')
export class PdfChatbotController {
  constructor(private readonly _pdfChatbotService: PdfChatbotService) {}

  @Post('extract-content')
  async ExtractContent(@Body() payload: ExtractContentRequest) {
    return await this._pdfChatbotService.ExtractContent(payload);
  }

  @Post('ask-question')
  async AskQuestion(@Body() payload: AskQuestionRequest) {
    return await this._pdfChatbotService.AskQuestion(payload);
  }

  @Post('generate-document-info')
  async GenerateDocumentInfo(@Body() payload: GenerateDocumentInfoRequest) {
    return await this._pdfChatbotService.GenerateDocumentInfo(payload);
  }

  @Post('chat-history')
  async ChatHistory(@Body() payload: ChatHistoryRequest) {
    return await this._pdfChatbotService.ChatHistory(payload);
  }
}
