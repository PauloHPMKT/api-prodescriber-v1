import { Module, Provider } from '@nestjs/common';
import { makeDatabaseConnectionProviders } from './providers/database.provider';

const providers: Provider[] = [...makeDatabaseConnectionProviders()];

@Module({
  providers,
  exports: providers,
})
export class DatabaseModule {}
