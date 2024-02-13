import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/auth.request';
import { UserEntity } from 'src/modules/users/domain/entities/User';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
