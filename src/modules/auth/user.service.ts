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
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CompareHash, HashKey } from '../../helpers/bcrypt.helper';
import { MapToUserResponse } from 'src/helpers/mapping.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private _userModelRepository: Repository<UserModel>,
  ) {}

  async RegisterAsync(payload: RegisterRequest): Promise<number> {
    let findUser = await this._userModelRepository.findOneBy({
      Email: payload.Email,
    });
    if (findUser != null) throw new BadRequestException('User Already Exist');

    let newUser = new UserModel();
    newUser.FullName = payload.FullName;
    newUser.Email = payload.Email;
    newUser.Password = await HashKey(payload.Password);
    newUser = await this._userModelRepository.save(newUser);

    return newUser.Id;
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
    if (payload.OldPassword && payload.NewPassword) {
      let newResetPasswordRequest = new ResetPasswordRequest();
      newResetPasswordRequest.OldPassword = payload.OldPassword;
      newResetPasswordRequest.NewPassword = payload.NewPassword;

      // will only update object, not DB
      user = await this.UpdatePasswordAsync(newResetPasswordRequest, user);
    }

    user.FullName = payload.FullName ?? user.FullName;

    user = await this._userModelRepository.save(user);

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

    // will only update object, not DB
    user = await this.UpdatePasswordAsync(payload, user);
    user = await this._userModelRepository.save(user);

    return true;
  }

  private async UpdatePasswordAsync(
    payload: ResetPasswordRequest,
    user: UserModel,
  ): Promise<UserModel> {
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
    user.Password = newPasswordHash;

    return user;
  }
}
