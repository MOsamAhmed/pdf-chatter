import { Injectable } from '@nestjs/common';
import {
  AskQuestionRequest,
  ChatHistoryRequest,
  ExtractContentRequest,
  GenerateDocumentInfoRequest,
} from './pdf-chatbot.request';
import { AxiosApiCallerService } from '../axios-api-caller/axios-api-caller.service';
import { AppEnv } from 'src/helpers/env.helper';

@Injectable()
export class PdfChatbotService {
  readonly PDF_CHATBOT_URI: string;
  readonly PDF_CHATBOT_SECRET_KEY: string;

  constructor(private _axiosApiCallerService: AxiosApiCallerService) {
    this.PDF_CHATBOT_URI = AppEnv('PDF_CHATBOT_URI', '');
    this.PDF_CHATBOT_SECRET_KEY = AppEnv('PDF_CHATBOT_SECRET_KEY', '');
  }

  async ExtractContent(payload: ExtractContentRequest) {
    let axiosHeaders = {};

    let axiosPayload: any = {
      file: payload.file,
    };

    let response = await this._axiosApiCallerService.DoPostApiCallAsync(
      `${this.PDF_CHATBOT_URI}/extract-content`,
      axiosPayload,
      axiosHeaders,
    );
    return response;
  }

  async AskQuestion(payload: AskQuestionRequest) {
    let axiosHeaders = {};

    let axiosPayload: any = {
      _id: payload._id,
      question: payload.question,
    };

    let response = await this._axiosApiCallerService.DoPostApiCallAsync(
      `${this.PDF_CHATBOT_URI}/ask-question`,
      axiosPayload,
      axiosHeaders,
    );
    return response;
  }

  async GenerateDocumentInfo(payload: GenerateDocumentInfoRequest) {
    let axiosHeaders = {};

    let axiosPayload: any = {
      _id: payload._id,
    };

    let response = await this._axiosApiCallerService.DoPostApiCallAsync(
      `${this.PDF_CHATBOT_URI}/generate-document-info`,
      axiosPayload,
      axiosHeaders,
    );
    return response;
  }

  async ChatHistory(payload: ChatHistoryRequest) {
    let axiosHeaders = {};

    let axiosPayload: any = {
      _id: payload._id,
    };

    let response = await this._axiosApiCallerService.DoPostApiCallAsync(
      `${this.PDF_CHATBOT_URI}/chat-history`,
      axiosPayload,
      axiosHeaders,
    );
    return response;
  }
}
