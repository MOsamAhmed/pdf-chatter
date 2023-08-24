import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { AUTHORIZATION_HEADER_KEY, ROLES } from '../../helpers/constants';
import { AuthDto } from './auth.response';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    private readonly _authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    const request = context.switchToHttp().getRequest();
    const requiredAuthorization = this._reflector.get<string[]>(
      AUTHORIZATION_HEADER_KEY,
      context.getHandler(),
    );
    const roles = this._reflector.get<string[]>(ROLES, context.getHandler());
    if (requiredAuthorization) {
      const token = request.headers[AUTHORIZATION_HEADER_KEY];
      if (!token) {
        throw new UnauthorizedException('Unauthorized Error');
      }

      // // new implementation
      // let decodedToken: any = VerifyJwtRs256Token(token);
      // if (
      //   !decodedToken ||
      //   (decodedToken && !decodedToken.User) ||
      //   (roles.length && !roles.includes(decodedToken.User.Type))
      // ) {
      //   throw new UnAuthorizedException(MessageTemplates.UnauthorizedError);
      // }
      // request.user = decodedToken.User;

      // old implementation
      let auth: AuthDto = await this._authService.GetSession(token);
      if (
        !auth ||
        (auth && !auth.User) ||
        (roles.length && !roles.includes(auth.User.Type))
      ) {
        throw new UnauthorizedException('Unauthorized Error');
      }
      request.user = auth.User;
    }

    return true;
  }
}
