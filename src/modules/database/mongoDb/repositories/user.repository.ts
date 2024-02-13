import {
  CreateUserRepository,
  CreateUserUseCase,
} from 'src/modules/users/infra/repositories/create-user.repository';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserEntity } from 'src/modules/users/domain/entities/User';
import { FindUserByEmailRepository } from 'src/modules/users/infra/repositories/find-user-by-email.repository';
import { VerifyUserRepository } from 'src/modules/users/infra/repositories/verify-user.repository';
import { UserDocument } from 'src/modules/users/infra/schemas/user.schema';

export class UserRepositoryImplementation
  implements
    CreateUserRepository,
    FindUserByEmailRepository,
    VerifyUserRepository
{
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: CreateUserUseCase.Params): Promise<string> {
    const { _id } = await this.userModel.create({
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
      role_system: data.role_system,
    });
    return _id.toString();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userModel.findOne({ email });
  }

  async verify(data: Partial<UserEntity>): Promise<boolean> {
    const user = await this.userModel.findOne(data);
    return !!user;
  }
}
