import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/usecases/create-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    try {
      const result = await this.createUserUseCase.create({
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        role_system: data.role_system,
      });
      return result;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
