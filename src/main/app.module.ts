import { Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../modules/users/presentation/user.module';
import { AuthModule } from '../modules/auth/auth.module';
import { makeAppGuardProvider } from '../infra/providers/app-guard.provider';
import { OpenaiModule } from '../modules/openai/presentation/controllers/openai.module';
import { ConfigModule } from '@nestjs/config';
import { GeminiModule } from '../modules/gemini/gemini.module';

const providers: Provider[] = [...makeAppGuardProvider(), AppService];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    OpenaiModule,
    AuthModule,
    GeminiModule,
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
