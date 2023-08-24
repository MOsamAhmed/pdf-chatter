import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  Email: string;

  @ApiProperty()
  Password: string;
}

export class RegisterRequest {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  FullName: string;

  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @MinLength(8)
  Password: string;

  // @ApiPropertyOptional()
  // @IsOptional()
  // @Length(0, 1000)
  // DeviceUUID: string;

  // @ApiPropertyOptional()
  // @IsOptional()
  // @Length(0, 1000)
  // FCMToken: string;
}

export class UpdateUserRequest {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsOptional()
  FullName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  OldPassword: string;

  @ApiProperty()
  @MinLength(8)
  @IsOptional()
  NewPassword: string;
}

export class ResetPasswordRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  OldPassword: string;

  @ApiProperty()
  @MinLength(8)
  NewPassword: string;
}
