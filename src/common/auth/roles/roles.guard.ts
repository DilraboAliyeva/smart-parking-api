import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { HttpError } from 'src/common/exception/http.error';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoels = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      const request = context.switchToHttp().getRequest();
      let bearerToken = request.headers['authorization'];

      if (!bearerToken) {
        HttpError({ code: 'BEARER_TOKEN_NOT_PROVIDED' });
      }
      bearerToken = bearerToken.split(' ')[1];

      const validUser: any = verify(
        bearerToken,
        process.env.ACCESS_TOKEN_SECRET,
      );

      if (!validUser) {
        HttpError({ code: 'LOGIN_FAILED' });
      }
      request.user = { ...validUser };
      return requiredRoels?.includes(validUser.role);
    } catch (error) {
      if (error.message == 'invalid token') {
        HttpError({ code: 'INVALID_JWT' });
      } else if (error.message == 'jwt expired') {
        HttpError({ code: 'JWT_EXPIRED' });
      } else if (error.message == 'invalid signature') {
        HttpError({ code: 'INVALID_SIGNATURE' });
      } else if (error.message == 'jwt malformed') {
        HttpError({ code: 'JWT_MALFORMED' });
      } else if (error.message == 'clockTimestamp must be a number') {
        HttpError({ code: 'CLOCKTIMESTAMP_MUST_BE_NUMBER' });
      } else if (error.message == 'nonce must be a non-empty string') {
        HttpError({ code: 'NONCE_MUST_BE_NON_EMPTY_STRING' });
      } else if (error.message == 'jwt must be provided') {
        HttpError({ code: 'JWT_MUST_BE_PROVIDED' });
      } else if (error.message == 'jwt must be string') {
        HttpError({ code: 'JWT_MUST_BE_STRING' });
      } else throw error;
    }
  }
}
