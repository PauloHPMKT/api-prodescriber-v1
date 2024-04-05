import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserEntity } from '../../domain/entities/User';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({})
export class User
  implements Omit<UserEntity, 'id' | 'created_at' | 'updated_at'>
{
  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  nickname: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    default: null,
  })
  avatar: string | null;

  @Prop({
    type: String,
    enum: [UserEntity.Plan.FREE, UserEntity.Plan.PRO],
    default: UserEntity.Plan.FREE,
  })
  plan: UserEntity.Plan;

  @Prop({
    type: String,
    enum: [UserEntity.RoleSystem.SYSTEM, UserEntity.RoleSystem.USER],
    default: UserEntity.RoleSystem.USER,
  })
  role_system: UserEntity.RoleSystem;

  @Prop({
    type: String,
    enum: [UserEntity.Status.ACTIVE, UserEntity.Status.INACTIVE],
    default: UserEntity.Status.ACTIVE,
  })
  status: UserEntity.Status;

  @Prop({
    type: Date,
    default: Date.now,
  })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
