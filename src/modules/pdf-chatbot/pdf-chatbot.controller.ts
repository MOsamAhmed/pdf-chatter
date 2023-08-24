import { Body, Controller, Post } from '@nestjs/common';
import { PdfChatbotService } from './pdf-chatbot.service';
import {
  AskQuestionRequest,
  ChatHistoryRequest,
  DocumentHistoryRequest,
  ExtractContentRequest,
  GenerateDocumentInfoRequest,
} from './pdf-chatbot.request';
import { ApiTags } from '@nestjs/swagger';
import { Authorized } from 'src/decorators/authorize.decorator';
import { UserModel } from '../auth/entities/user.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@ApiTags('pdf-chatbot')
@Controller('pdf-chatbot')
export class PdfChatbotController {
  constructor(private readonly _pdfChatbotService: PdfChatbotService) {}

  @Authorized()
  @Post('document-history')
  async DocumentHistory(
    @Body() payload: DocumentHistoryRequest,
    @CurrentUser() user: UserModel,
  ) {
    return await this._pdfChatbotService.DocumentHistory(payload, user);
  }

  @Authorized()
  @Post('extract-content')
  async ExtractContent(
    @Body() payload: ExtractContentRequest,
    @CurrentUser() user: UserModel,
  ) {
    return await this._pdfChatbotService.ExtractContent(payload, user);
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
