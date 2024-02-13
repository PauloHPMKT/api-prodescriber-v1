import { UserEntity } from 'src/modules/users/domain/entities/User';

export interface UserToken {
  access_token: string;
  user: UserEntity;
}
