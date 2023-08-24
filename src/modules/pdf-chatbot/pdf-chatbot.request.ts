import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DocumentHistoryRequest {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  page: number = 1;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  size: number = 1000;
}

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
