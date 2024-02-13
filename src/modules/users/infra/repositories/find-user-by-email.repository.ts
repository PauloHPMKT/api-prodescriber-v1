import { UserEntity } from '../../domain/entities/User';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<UserEntity>;
}
