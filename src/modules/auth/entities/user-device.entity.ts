import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../models/base.entity';
import { UserModel } from './user.entity';

export class UserDeviceModel extends BaseModel {
  @Column({
    name: 'auth_token',
    nullable: false,
  })
  AuthToken: string;

  @Column({
    name: 'auth_token_expiry',
    type: 'timestamptz',
    nullable: false,
  })
  AuthTokenExpiry: Date;

  @Column({
    name: 'device_code',
    nullable: true,
  })
  DeviceCode: string;

  @Column({
    name: 'fcm_token',
    nullable: true,
  })
  FCMToken: string;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  UserId: number;

  @ManyToOne(() => UserModel, (user) => user.UserDevices)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: UserModel;
}
