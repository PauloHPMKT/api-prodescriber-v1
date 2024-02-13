import { Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/presentation/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { makeAppGuardProvider } from './infra/providers/app-guard.provider';

const providers: Provider[] = [...makeAppGuardProvider(), AppService];
@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers,
})
export class AppModule {}
