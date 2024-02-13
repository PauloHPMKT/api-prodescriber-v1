import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../../domain/models/user.model';
import { CreateUserRepository } from '../../infra/repositories/create-user.repository';
import { VerifyUserRepository } from '../../infra/repositories/verify-user.repository';
import { EncripterAdapter } from 'src/application/adapters/encripter.adapter';

export type Result = any; // Define the Result type here, replace 'any' with the actual type

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
      email: data.email,
      password: encripter,
      role: data.role,
      role_system: data.role_system,
    };
    return await this.createUserRepository.create(userToCreate);
  }
}
