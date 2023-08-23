import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UpdateUserRequest,
} from './auth.request';
import { LoginResponse, UserResponse } from './auth.response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Post('add-test')
  async AddTest(@Body() payload) {
    return await this._userService.AddTest(payload);
  }

  @Post('get-test')
  async GetTest() {
    return await this._userService.GetTest();
  }
  //   |
  //   |
  //   |

  @Post('login')
  async LoginAsync(@Body() payload: LoginRequest): Promise<LoginResponse> {
    return await this._authService.LoginAsync(payload);
  }

  @Post('register')
  async RegisterAsync(
    @Body() payload: RegisterRequest,
  ): Promise<LoginResponse> {
    let newUserId = await this._userService.RegisterAsync(payload);
    return await this._authService.LoginAsync(payload, newUserId, true);
  }

  @Get('me')
  async GetUserAsync(): Promise<UserResponse> {
    return await this._userService.GetUserAsync(null);
  }

  @Patch('update-user')
  async UpdateUserAsync(
    @Body() payload: UpdateUserRequest,
  ): Promise<UserResponse> {
    return await this._userService.UpdateUserAsync(payload, null);
  }

  @Put('reset-password')
  async ResetPasswordAsync(
    @Body() payload: ResetPasswordRequest,
  ): Promise<boolean> {
    return await this._userService.ResetPasswordAsync(payload, null);
  }
}
