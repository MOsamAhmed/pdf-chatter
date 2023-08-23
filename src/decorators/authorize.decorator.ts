import { SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import {
  AUTHORIZATION_HEADER_KEY,
  LINK_CURRENT_USER,
  ROLES,
} from '../helpers/constants';

export const Authorized = (
  roleOrRoles?: string | Array<String>,
  allowPublic?: Boolean,
) => {
  let authorizedRoles = [];
  if (roleOrRoles)
    authorizedRoles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];
  return applyDecorators(
    SetMetadata(ROLES, authorizedRoles),
    !allowPublic
      ? SetMetadata(AUTHORIZATION_HEADER_KEY, true)
      : SetMetadata(LINK_CURRENT_USER, true),
    ApiSecurity(AUTHORIZATION_HEADER_KEY),
  );
};
