import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../../../models/base.entity';
import { Exclude } from 'class-transformer';
import { UserDeviceModel } from './user-device.entity';

export enum UserModelTypeEnum {
  Admin = 'Admin',
  User = 'User',
  Guest = 'Guest',
}

@Entity('user')
export class UserModel extends BaseModel {
  @Column({
    name: 'full_name',
    nullable: false,
  })
  FullName: string;

  @Column({
    name: 'email',
    nullable: false,
  })
  Email: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  @Exclude()
  Password: string;

  @Column({
    name: 'user_model_type',
    type: 'enum',
    enum: UserModelTypeEnum,
    default: UserModelTypeEnum.User,
    nullable: false,
  })
  Type: UserModelTypeEnum;

  @Column({
    name: 'is_active',
    default: true,
    nullable: false,
  })
  IsActive: boolean;

  @Column({
    name: 'last_active',
    type: 'timestamptz',
    nullable: true,
  })
  LastActive: Date;

  @Column({
    name: 'email_verification_otp',
    nullable: true,
  })
  EmailVerificationOTP: string;

  @Column({
    name: 'email_verification_otp_expiry',
    type: 'timestamptz',
    nullable: true,
  })
  EmailVerificationOTPExpiry: Date;

  @OneToMany(() => UserDeviceModel, (userDevice) => userDevice.User)
  UserDevices: UserDeviceModel[];
}
