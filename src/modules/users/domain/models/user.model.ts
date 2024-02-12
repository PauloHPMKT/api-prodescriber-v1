import { UserEntity } from '../entities/User';

export namespace UserModel {
  export type ToCreate = Omit<UserEntity, 'id' | 'created_at' | 'updated_at'>;
}
