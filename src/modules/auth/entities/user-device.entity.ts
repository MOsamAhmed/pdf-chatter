import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../models/base.entity';
import { UserModel } from './user.entity';
import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDeviceModelDocument = HydratedDocument<UserDeviceModel>;

@Schema()
export class UserDeviceModel extends BaseModel {
  @Prop()
  AuthToken: string;

  @Prop()
  AuthTokenExpiry: Date;

  @Prop()
  DeviceCode: string;

  @Prop()
  FCMToken: string;

  @Prop({ type: Types.ObjectId })
  UserId: string;

  // @ManyToOne(() => UserModel, (user) => user.UserDevices)
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  // User: UserModel;
}

export const UserDeviceModelSchema =
  SchemaFactory.createForClass(UserDeviceModel);
