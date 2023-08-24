import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserModelSchema } from './entities/user.entity';
import {
  UserDeviceModel,
  UserDeviceModelSchema,
} from './entities/user-device.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserModelSchema },
      { name: UserDeviceModel.name, schema: UserDeviceModelSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService, UserService],
})
export class AuthModule {}
