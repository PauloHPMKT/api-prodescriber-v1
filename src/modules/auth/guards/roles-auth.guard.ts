import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthRequest } from '../models/auth.request';
import { JwtPayload } from '../models/jwt.decode';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const jwtToken = request.headers.authorization;

    const decode = jwtToken.split('.')[1];
    const decodeBuffer = Buffer.from(decode, 'base64');
    const plan = JSON.parse(decodeBuffer.toString()) as JwtPayload;

    const rolesUser = plan.user.plan;

    if (rolesUser === 'pro') {
      return true;
    } else {
      throw new UnauthorizedException(
        'Esta requisição só poderá ser feita por um usuário conta pro',
      );
    }
  }
}
