import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRepository } from '../../infra/repositories/create-user.repository';
import { UserModel } from '../../domain/models/user.model';

export type Result = any; // Define the Result type here, replace 'any' with the actual type

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository,
  ) {}
  async create(data: UserModel.ToCreate): Promise<Result> {
    return await this.createUserRepository.create(data);
  }
}
