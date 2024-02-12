import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/usecases/create-user.usecase';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.createUserUseCase.create(data);
  }
}
