export interface UserProps {
  id?: string;
  username: string;
  nickname: string;
  email: string;
  password: string;
  avatar?: string;
  plan: UserEntity.Plan;
  role_system: UserEntity.RoleSystem;
  status: UserEntity.Status;
  created_at?: Date;
  updated_at?: Date;
}

export class UserEntity {
  id: string;
  constructor(private readonly props: UserProps) {
    this.props.created_at = this.props.created_at ?? new Date();
    this.props.updated_at = this.props.updated_at ?? new Date();
    this.avatar = this.props.avatar ?? null;
  }

  get username(): string {
    return this.props.username;
  }

  get nickname(): string {
    return this.props.nickname;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get avatar(): string | null {
    return this.props.avatar;
  }

  get plan(): UserEntity.Plan {
    return this.props.plan;
  }

  get role_system(): UserEntity.RoleSystem {
    return this.props.role_system;
  }

  get status(): UserEntity.Status {
    return this.props.status;
  }

  private set avatar(value: string) {
    this.props.avatar = value;
  }
}

export namespace UserEntity {
  export enum Plan {
    FREE = 'free',
    PRO = 'pro',
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
