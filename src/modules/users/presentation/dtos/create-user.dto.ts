//import { UserEntity } from '../../domain/entities/User';

export class CreateUserDto {
  id?: string;
  username: string;
  nickname: string;
  email: string;
  password: string;
  // plan: UserEntity.Plan;
  // role_system: UserEntity.RoleSystem;
  // status: UserEntity.Status;
}
