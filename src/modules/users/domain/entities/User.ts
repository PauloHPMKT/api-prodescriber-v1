export interface UserEntityProps {
  id?: string;
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  role: UserEntity.Role;
  role_system: UserEntity.RoleSystem;
  status: UserEntity.Status;
  created_at?: Date;
  updated_at?: Date;
}

export class UserEntity {
  constructor(private readonly props: UserEntityProps) {}
}

export namespace UserEntity {
  export enum Role {
    ADMIN = 'admin',
    USER = 'user',
  }
  export enum RoleSystem {
    SYSTEM = 'system',
    USER = 'user',
  }
  export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }
}
