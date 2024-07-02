import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../../domain/entities/User';

export class _UpdateUserDto {
  username: string;
  password: string;
  plan: UserEntity.Plan;
}

export class UpdateUserDto extends PartialType(_UpdateUserDto) {}
