import { Request } from 'express';
import { UserEntity } from 'src/modules/users/domain/entities/User';

export interface AuthRequest extends Request {
  user: UserEntity;
}
