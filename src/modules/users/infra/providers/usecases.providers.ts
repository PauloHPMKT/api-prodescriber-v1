import { Provider } from '@nestjs/common';
import { UserRepositoryImplementation } from 'src/modules/database/mongoDb/repositories/user.repository';

export const makeUserRepositoryProviders = (): Provider[] => [
  {
    provide: 'CreateUserRepository',
    useClass: UserRepositoryImplementation,
  },
];
