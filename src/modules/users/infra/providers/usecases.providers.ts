import { Provider } from '@nestjs/common';
import { Encripter } from 'src/infra/shared/encripter';
import { UserRepositoryImplementation } from 'src/modules/database/mongoDb/repositories/user.repository';

export const makeUserRepositoryProviders = (): Provider[] => [
  {
    provide: 'EncriptPassword',
    useClass: Encripter,
  },
  {
    provide: 'CreateUserRepository',
    useClass: UserRepositoryImplementation,
  },
  {
    provide: 'FindUserByEmailRepository',
    useClass: UserRepositoryImplementation,
  },
  {
    provide: 'VerifyUserRepository',
    useClass: UserRepositoryImplementation,
  },
  {
    provide: 'UpdateUserRepository',
    useClass: UserRepositoryImplementation,
  },
];
