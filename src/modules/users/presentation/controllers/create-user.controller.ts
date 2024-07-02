import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/usecases/create-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() data: CreateUserDto) {
    try {
      const result = await this.createUserUseCase.create({
        username: data.username,
        nickname: data.nickname,
        email: data.email,
        password: data.password,
      });
      return result;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
