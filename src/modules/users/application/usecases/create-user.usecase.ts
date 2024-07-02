import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../../domain/models/user.model';
import { CreateUserRepository } from '../repositories/create-user.repository';
import { VerifyUserRepository } from '../repositories/verify-user.repository';
import { EncripterAdapter } from 'src/application/adapters/encripter.adapter';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('EncriptPassword')
    private readonly encriptPassword: EncripterAdapter,
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository,
    @Inject('VerifyUserRepository')
    private readonly verifyUserRepository: VerifyUserRepository,
  ) {}
  async create(data: UserModel.ToCreate): Promise<string> {
    const user = await this.verifyUserRepository.verify({ email: data.email });
    if (user) {
      throw new Error('User already exists');
    }

    const encripter = await this.encriptPassword.encript(data.password);
    const userToCreate = {
      username: data.username,
      nickname: data.nickname,
      email: data.email,
      password: encripter,
    };
    return await this.createUserRepository.create(userToCreate);
  }
}
