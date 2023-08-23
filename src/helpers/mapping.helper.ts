import { UserResponse } from '../modules/auth/auth.response';
import { UserModel } from '../modules/auth/entities/user.entity';

export function MapToUserResponse(user: UserModel): UserResponse {
  let result = new UserResponse();
  result.FullName = user.FullName;
  result.Email = user.Email;
  result.Type = user.Type;
  result.IsActive = user.IsActive;
  result.LastActive = user.LastActive;
  return result;
}
