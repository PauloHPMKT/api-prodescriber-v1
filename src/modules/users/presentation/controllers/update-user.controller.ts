import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
} from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserUseCase } from '../../application/usecases/update-user.usecase';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  @Patch('update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    try {
      const result = await this.updateUserUseCase.update(id, data);
      return result;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
