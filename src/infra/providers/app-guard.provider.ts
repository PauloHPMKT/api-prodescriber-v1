import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

export const makeAppGuardProvider = (): Provider[] => [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
];
