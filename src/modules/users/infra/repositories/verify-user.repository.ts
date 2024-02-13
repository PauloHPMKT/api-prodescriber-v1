import { UserEntity } from '../../domain/entities/User';

export interface VerifyUserRepository {
  verify(data: Partial<UserEntity>): Promise<boolean>;
}
