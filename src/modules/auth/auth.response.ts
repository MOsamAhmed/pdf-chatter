import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { UserModel, UserModelTypeEnum } from './entities/user.entity';

export class LoginResponse {
  @ApiResponseProperty()
  AuthToken: string;

  @ApiResponseProperty()
  IsFirstTimeLogin: boolean;
}

export class UserResponse {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  FullName: string;

  @ApiResponseProperty()
  Email: string;

  @ApiResponseProperty()
  Type: UserModelTypeEnum;

  @ApiResponseProperty()
  IsActive: boolean;

  @ApiResponseProperty()
  LastActive: Date;
}

export class AuthDto {
  public UserId: string;
  public User: UserModel;

  constructor(userId: string, user?: UserModel) {
    this.UserId = userId;
    if (user) {
      this.User = user;
    }
  }
}
