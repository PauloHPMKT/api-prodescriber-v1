import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CreateUserRepository,
  CreateUserUseCase,
} from 'src/modules/users/infra/repositories/create-user.repository';
import { UserDocument } from 'src/modules/users/infra/schemas/user.schema';

export class UserRepositoryImplementation implements CreateUserRepository {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(
    data: CreateUserUseCase.Params,
  ): Promise<CreateUserUseCase.Result> {
    console.log(data, 'Chegou na implementação do repository!');
    const user = await this.userModel.create(data);
    return { id: user._id.toString() };
  }
}
