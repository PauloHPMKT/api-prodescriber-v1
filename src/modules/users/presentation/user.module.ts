import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { makeUserCollectionProviders } from '../infra/providers/user.provider';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '../application/usecases/create-user.usecase';
import { makeUserRepositoryProviders } from '../infra/providers/usecases.providers';

const providers: Provider[] = [
  ...makeUserCollectionProviders(),
  ...makeUserRepositoryProviders(),
  CreateUserUseCase,
];

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers,
  exports: [],
})
export class UserModule {}
