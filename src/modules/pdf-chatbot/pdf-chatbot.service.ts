import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AskQuestionRequest,
  ChatHistoryRequest,
  DocumentHistoryRequest,
  ExtractContentRequest,
  GenerateDocumentInfoRequest,
} from './pdf-chatbot.request';
import { AxiosApiCallerService } from '../axios-api-caller/axios-api-caller.service';
import { AppEnv } from 'src/helpers/env.helper';
import { UserModel } from '../auth/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TextDataModel } from './entities/text-data.entity';
import axios, { AxiosError } from 'axios';

@Injectable()
export class PdfChatbotService {
  readonly PDF_CHATBOT_URI: string;
  // readonly PDF_CHATBOT_SECRET_KEY: string;

  constructor(
    @InjectModel(TextDataModel.name)
    private _textDataModelRepository: Model<TextDataModel>,

    private _axiosApiCallerService: AxiosApiCallerService,
  ) {
    this.PDF_CHATBOT_URI = AppEnv('PDF_CHATBOT_URI', '');
    // this.PDF_CHATBOT_SECRET_KEY = AppEnv('PDF_CHATBOT_SECRET_KEY', '');
  }

  async DocumentHistory(payload: DocumentHistoryRequest, user: UserModel) {
    const page = payload.page || 1;
    const size = payload.size || 1000;
    const skip = (page - 1) * size;

    let documentHistory = await this._textDataModelRepository
      .find({
        user_id: user._id,
      })
      .skip(skip)
      .limit(payload.size);

    return documentHistory;
  }

  async ExtractContent(payload: ExtractContentRequest, user: UserModel) {
    // let newUser = new UserModel();
    // newUser.FullName = payload.FullName;
    // newUser.Email = payload.Email;
    // newUser.Password = await HashKey(payload.Password);

    // let createdUser = new this._userModelRepository(newUser);
    // createdUser = await createdUser.save();
    // return createdUser._id;

    let newTextData = new TextDataModel();
    newTextData.content = payload.file;
    newTextData.user_id = user._id;

    let createdTextData = new this._textDataModelRepository(newTextData);
    createdTextData = await createdTextData.save();

    return {
      currentDocumentId: createdTextData._id,
    };
  }

  // async ExtractContent(payload: ExtractContentRequest, user: UserModel) {
  //   try {
  //     const form = new FormData();
  //     form.append('text', payload.file);
  //     form.append('user_id', user._id);

  //     const response = await axios.post(
  //       `${this.PDF_CHATBOT_URI}/extract-content`,
  //       form,
  //       {
  //         headers: {},
  //       },
  //     );

  //     // Check the status code and handle different response types
  //     if (response.status >= 200 && response.status < 300) {
  //       return response.data; // Return successful response data
  //     } else {
  //       throw new HttpException(response.data, response.status);
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const axiosError = error as AxiosError;
  //       throw new HttpException(
  //         axiosError.response?.data || 'Internal Server Error',
  //         axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     } else {
  //       throw new HttpException(
  //         'Internal Server Error',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
  // }

  async AskQuestion(payload: AskQuestionRequest) {
    let axiosHeaders = {};

    let axiosPayload: any = {
      _id: payload.documentId,
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
      _id: payload.documentId,
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
      _id: payload.documentId,
    };

    let response = await this._axiosApiCallerService.DoPostApiCallAsync(
      `${this.PDF_CHATBOT_URI}/chat-history`,
      axiosPayload,
      axiosHeaders,
    );
    return response;
  }
}
