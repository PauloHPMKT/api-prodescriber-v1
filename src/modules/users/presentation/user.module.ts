import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { makeUserCollectionProviders } from '../infra/providers/user.provider';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserUseCase } from '../application/usecases/create-user.usecase';
import { makeUserRepositoryProviders } from '../infra/providers/usecases.providers';
import { UpdateUserUseCase } from '../application/usecases/update-user.usecase';
import { UpdateUserController } from './controllers/update-user.controller';

const providers: Provider[] = [
  ...makeUserCollectionProviders(),
  ...makeUserRepositoryProviders(),
  CreateUserUseCase,
  UpdateUserUseCase,
];

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, UpdateUserController],
  providers,
  exports: [UserModule, ...providers],
})
export class UserModule {}
