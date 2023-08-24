import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExtractContentRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  file: string;
}

export class AskQuestionRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  documentId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string;
}

export class GenerateDocumentInfoRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  documentId: string;
}

export class ChatHistoryRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  documentId: string;
}
