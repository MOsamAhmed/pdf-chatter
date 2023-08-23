import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoginResponse, UserResponse } from './auth.response';
import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UpdateUserRequest,
} from './auth.request';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel, UserModelTypeEnum } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CompareHash, HashKey } from '../../helpers/bcrypt.helper';
import { MapToUserResponse } from 'src/helpers/mapping.helper';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private _userModelRepository: Model<UserModel>,
  ) {}

  async AddTest(payload: RegisterRequest): Promise<UserModel> {
    const newUser = new UserModel();
    newUser.FullName = 'John Doe';
    newUser.Email = 'john123doe@example.com';
    newUser.Password = 'password123';
    newUser.Type = UserModelTypeEnum.User;
    newUser.IsActive = true;
    newUser.LastActive = new Date();

    let aaa = {
      _id: '64e5eea77ed654f01f3735e2',
      FullName: 'John Doe',
      Email: 'john12345doe@example.com',
      Password: 'password123',
      Type: 'User',
      IsActive: true,
    };

    // let abc: any = {};
    // abc.FullName = 'sdfdasf';
    // abc.Email = 'asdf@sdaf.comdsfa';
    // // abc._id = '64e59dfb71d796efbb653fe1';

    const createdUser = await this._userModelRepository.updateOne(aaa);
    return new UserModel();
  }

  async GetTest(): Promise<UserModel> {
    let aaa = await this._userModelRepository.findOne({
      Email: 'johnsdoe@example.com',
    });

    console.log('aaa', aaa, 'aaa');
    return aaa;
  }

  async RegisterAsync(payload: RegisterRequest): Promise<string> {
    let findUser = await this._userModelRepository.findOne({
      Email: payload.Email,
    });
    if (findUser != null) throw new BadRequestException('User Already Exist');

    let newUser = new UserModel();
    newUser.FullName = payload.FullName;
    newUser.Email = payload.Email;
    newUser.Password = await HashKey(payload.Password);

    let createdUser = new this._userModelRepository(newUser);
    createdUser = await createdUser.save();
    return createdUser._id;
  }

  async GetUserAsync(user: UserModel): Promise<UserResponse> {
    // Not finding user again in database
    // beacause it was already fetched
    // due to authorization

    let result = MapToUserResponse(user);
    return result;
  }

  async UpdateUserAsync(
    payload: UpdateUserRequest,
    user: UserModel,
  ): Promise<UserResponse> {
    // Not finding user again in database
    // beacause it was already fetched
    // due to authorization
    let updateParams: any = {};

    if (payload.OldPassword && payload.NewPassword) {
      let newResetPasswordRequest = new ResetPasswordRequest();
      newResetPasswordRequest.OldPassword = payload.OldPassword;
      newResetPasswordRequest.NewPassword = payload.NewPassword;

      updateParams.Password = await this.UpdatePasswordAsync(
        newResetPasswordRequest,
        user,
      );
    }

    updateParams.FullName = payload.FullName ?? user.FullName;

    user = await this._userModelRepository.findByIdAndUpdate(
      user._id,
      updateParams,
    );

    let result = MapToUserResponse(user);
    return result;
  }

  async ResetPasswordAsync(
    payload: ResetPasswordRequest,
    user: UserModel,
  ): Promise<boolean> {
    // Not finding user again in database
    // beacause it was already fetched
    // due to authorization
    let updateParams: any = {};

    // will only update object, not DB
    updateParams.Password = await this.UpdatePasswordAsync(payload, user);
    user = await this._userModelRepository.findByIdAndUpdate(
      user._id,
      updateParams,
    );

    return true;
  }

  private async UpdatePasswordAsync(
    payload: ResetPasswordRequest,
    user: UserModel,
  ): Promise<string> {
    const isOldPasswordMatched = await CompareHash(
      payload.OldPassword,
      user.Password,
    );
    if (!isOldPasswordMatched)
      throw new BadRequestException('Invalid Credentials');

    const isNewPasswordMatched = await CompareHash(
      payload.NewPassword,
      user.Password,
    );
    if (isNewPasswordMatched) throw new ForbiddenException();

    const newPasswordHash = await HashKey(payload.OldPassword);
    return newPasswordHash;
  }
}
