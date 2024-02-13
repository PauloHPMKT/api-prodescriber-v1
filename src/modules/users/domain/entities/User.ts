export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly avatar: string | null,
    public readonly role: UserEntity.Role,
    public readonly role_system: UserEntity.RoleSystem,
    public readonly status: UserEntity.Status,
    public readonly created_at?: Date,
    public readonly updated_at?: Date,
  ) {}
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
