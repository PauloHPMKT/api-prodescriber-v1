import {
  CreateUserRepository,
  CreateUserUseCase,
} from 'src/modules/users/infra/repositories/create-user.repository';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserEntity } from '../../../users/domain/entities/User';
import { FindUserByEmailRepository } from 'src/modules/users/infra/repositories/find-user-by-email.repository';
import { VerifyUserRepository } from 'src/modules/users/infra/repositories/verify-user.repository';
import { UserDocument } from 'src/modules/users/infra/schemas/user.schema';
import { UpdateUserRepository } from 'src/modules/users/infra/repositories/update-user.repository';
import { UpdateUserDto } from 'src/modules/users/presentation/dtos/update-user.dto';

export class UserRepositoryImplementation
  implements
    CreateUserRepository,
    FindUserByEmailRepository,
    VerifyUserRepository,
    UpdateUserRepository
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
      ...data,
    });
    return _id.toString();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userModel.findOne({ email });
  }

  async verify(data: Partial<UserEntity>): Promise<boolean> {
    let user: Partial<UserEntity>;
    if (data.id) {
      user = await this.userModel.findOne({ _id: data.id });
      return !!user;
    }
    user = await this.userModel.findOne(data);
    return !!user;
  }

  async update(id: string, data: UpdateUserDto): Promise<string> {
    const userToUpdate = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true },
    );
    return userToUpdate._id.toString();
  }
}
