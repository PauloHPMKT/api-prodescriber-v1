import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserRepository } from '../repositories/update-user.repository';
import { UpdateUserDto } from '../../presentation/dtos/update-user.dto';
import { VerifyUserRepository } from '../repositories/verify-user.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UpdateUserRepository')
    private readonly updateUserRepository: UpdateUserRepository,
    @Inject('VerifyUserRepository')
    private readonly verifyUserRepository: VerifyUserRepository,
  ) {}
  async update(id: string, data: UpdateUserDto): Promise<any> {
    console.log(id, data);
    // const requiredFields = Object.keys(data).filter(
    //   (field) => field !== 'email',
    // );
    // for (const field of requiredFields) {
    //   if (!data[field]) {
    //     throw new Error(`Campo ${field} é obrigatório`);
    //   }
    // }
    // const existUser = await this.verifyUserRepository.verify({ id });
    // if (!existUser) {
    //   throw new Error('User not found');
    // }
    // return await this.updateUserRepository.update(id, data);
  }
}
