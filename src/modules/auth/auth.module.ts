import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/presentation/user.module';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles-auth.guard';
import { LoginValidationMiddleware } from './middleware/validation.middleware';
import { JwtStrategy } from './strategies/jwt.strategies';
import { LocalStrategy } from './strategies/local.strategy';
import { makeAuthProviders } from './infra/providers/auth.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';

const providers: Provider[] = [
  ...makeAuthProviders(),
  AuthService,
  LocalStrategy,
  JwtStrategy,
  RolesGuard,
];

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '100h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers,
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
