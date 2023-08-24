import { Body, Controller, Post } from '@nestjs/common';
import { PdfChatbotService } from './pdf-chatbot.service';
import {
  AskQuestionRequest,
  ChatHistoryRequest,
  ExtractContentRequest,
  GenerateDocumentInfoRequest,
} from './pdf-chatbot.request';
import { ApiTags } from '@nestjs/swagger';
import { Authorized } from 'src/decorators/authorize.decorator';

@ApiTags('pdf-chatbot')
@Controller('pdf-chatbot')
export class PdfChatbotController {
  constructor(private readonly _pdfChatbotService: PdfChatbotService) {}

  @Authorized()
  @Post('extract-content')
  async ExtractContent(@Body() payload: ExtractContentRequest) {
    return await this._pdfChatbotService.ExtractContent(payload);
  }

  @Authorized()
  @Post('ask-question')
  async AskQuestion(@Body() payload: AskQuestionRequest) {
    return await this._pdfChatbotService.AskQuestion(payload);
  }

  @Authorized()
  @Post('generate-document-info')
  async GenerateDocumentInfo(@Body() payload: GenerateDocumentInfoRequest) {
    return await this._pdfChatbotService.GenerateDocumentInfo(payload);
  }

  @Authorized()
  @Post('chat-history')
  async ChatHistory(@Body() payload: ChatHistoryRequest) {
    return await this._pdfChatbotService.ChatHistory(payload);
  }
}
