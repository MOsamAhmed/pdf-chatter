import { Prop } from '@nestjs/mongoose';
import { Schema, Types } from 'mongoose';

export abstract class BaseModel {
  // @Prop({ auto: true, default: Types.ObjectId() })
  _id: string;

  // below date properties not in use right now
  @Prop()
  public CreatedAt: Date;

  @Prop()
  public UpdatedAt: Date;

  @Prop()
  public DeletedAt: Date;
}

// not in use right now
export const BaseSchema = new Schema({
  _id: String, //or number, or (increment) function,

  CreatedAt: Date,

  UpdatedAt: Date,

  DeletedAt: Date,
});
