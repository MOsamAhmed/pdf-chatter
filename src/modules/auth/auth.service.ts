import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDeviceModel } from './entities/user-device.entity';
import { Repository } from 'typeorm';
import { LoginRequest } from './auth.request';
import { AuthDto, LoginResponse } from './auth.response';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from './entities/user.entity';
import { CompareHash } from 'src/helpers/bcrypt.helper';
import * as moment from 'moment-timezone';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private _userModelRepository: Repository<UserModel>,
    @InjectRepository(UserDeviceModel)
    private _userDeviceModelRepository: Repository<UserDeviceModel>,
  ) {}

  async LoginAsync(
    payload: LoginRequest,
    userId?: number,
    isFirstTimeLogin: boolean = false,
  ): Promise<LoginResponse> {
    let result = new LoginResponse();
    result.IsFirstTimeLogin = isFirstTimeLogin;

    if (!isFirstTimeLogin) {
      let findUser = await this._userModelRepository.findOneBy({
        Email: payload.Email,
      });
      if (!findUser) throw new NotFoundException('User Not Found');

      let isPasswordMatched = await CompareHash(
        payload.Password,
        findUser.Password,
      );
      if (!isPasswordMatched)
        throw new BadRequestException('Invalid Credentials');

      userId = findUser.Id;
    }

    result.AuthToken = await this.GenAuthToken(userId);

    return result;
  }

  async GenAuthToken(userId: number): Promise<string> {
    let newUserDevice = new UserDeviceModel();
    newUserDevice.UserId = userId;
    newUserDevice.AuthTokenExpiry = moment().add(7, 'd').toDate();
    newUserDevice.AuthToken = uuidv4();
    newUserDevice = await this._userDeviceModelRepository.save(newUserDevice);

    return newUserDevice.AuthToken;
  }

  async GetSession(token: string): Promise<AuthDto> {
    let findUserDevice = await this._userDeviceModelRepository.findOneBy({
      AuthToken: token,
    });
    let curDate = new Date();

    if (findUserDevice == null || findUserDevice.AuthTokenExpiry < curDate) {
      return null;
    }

    let findUser = await this._userModelRepository.findOneBy({
      Id: findUserDevice.UserId,
    });

    let result = new AuthDto(findUser.Id, findUser);
    return result;
  }
}
