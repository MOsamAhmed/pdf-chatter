import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel, BaseSchema } from '../../../models/base.entity';
import { Exclude } from 'class-transformer';
import { UserDeviceModel } from './user-device.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum UserModelTypeEnum {
  Admin = 'Admin',
  User = 'User',
  Guest = 'Guest',
}

export type UserModelDocument = HydratedDocument<UserModel>;

@Schema()
export class UserModel extends BaseModel {
  @Prop()
  FullName: string;

  @Prop()
  Email: string;

  @Prop()
  @Exclude()
  Password: string;

  @Prop()
  Type: UserModelTypeEnum;

  @Prop()
  IsActive: boolean;

  @Prop()
  LastActive?: Date;

  @Prop()
  EmailVerificationOTP?: string;

  @Prop()
  EmailVerificationOTPExpiry?: Date;

  @Prop({ type: [Types.ObjectId], ref: UserDeviceModel.name })
  UserDevices: UserDeviceModel[];
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);
