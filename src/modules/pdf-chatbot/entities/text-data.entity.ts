import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseModel } from 'src/models/base.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';

export type TextDataModelDocument = HydratedDocument<TextDataModel>;

@Schema({ collection: 'text_data' })
export class TextDataModel extends BaseModel {
  @Prop({ type: Types.ObjectId })
  user_id: string;

  @Prop()
  content: string;
}

export const TextDataModelSchema = SchemaFactory.createForClass(TextDataModel);
