import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRepository } from '../../infra/repositories/create-user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository,
  ) {}
  async create(data: any): Promise<string> {
    return await this.createUserRepository.create(data);
  }
}
