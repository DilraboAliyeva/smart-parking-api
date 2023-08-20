import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation } from '@nestjs/swagger';
import { AuthorizationGuard } from './auth.guard';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';

export function DecoratorWrapper(
  summary: string,
  authRequired: boolean,
  roles?: Role[],
) {
  return authRequired
    ? applyDecorators(
        ApiOperation({ summary }),
        ApiBearerAuth('auth-token'),
        Roles(...roles),
        UseGuards(AuthorizationGuard),
      )
    : applyDecorators(ApiOperation({ summary }));
}
