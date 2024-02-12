import { UserEntity } from 'src/modules/users/domain/entities/User';

export class CreateUserDto extends UserEntity {
  username: string;
  email: string;
  password: string;
  role: UserEntity.Role;
  role_system: UserEntity.RoleSystem;
}
