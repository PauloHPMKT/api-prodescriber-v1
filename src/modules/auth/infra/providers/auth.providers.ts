import { Provider } from '@nestjs/common';
import { Encripter } from 'src/infra/shared/encripter';
import { UserRepositoryImplementation } from 'src/modules/database/mongoDb/repositories/user.repository';

export const makeAuthProviders = (): Provider[] => [
  {
    provide: 'EncriptPassword',
    useClass: Encripter,
  },
  {
    provide: 'FindUserByEmailRepository',
    useClass: UserRepositoryImplementation,
  },
];
