import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/domain/entities/User';
import { UserToken } from './models/user.token';
import { EncripterAdapter } from 'src/application/adapters/encripter.adapter';
import { FindUserByEmailRepository } from '../users/infra/repositories/find-user-by-email.repository';
import { UserPayload } from './models/user.payload';

@Injectable()
export class AuthService {
  constructor(
    @Inject('EncriptPassword')
    private readonly encriptPassword: EncripterAdapter,
    @Inject('FindUserByEmailRepository')
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly jwtService: JwtService,
  ) {}

  //validar usuario
  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmailRepository.findByEmail(email);
    if (user) {
      const compareValidPassword = await this.encriptPassword.compare(
        password,
        user.password,
      );
      if (compareValidPassword) return user;
    }
    throw new Error('Email ou senhas incorretos!');
  }

  // realizar login
  login(user: UserEntity): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      plan: user.plan,
      role_system: user.role_system,
    };
    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
      user,
    };
  }
}
