import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

export const makeDatabaseConnectionProviders = (): Provider[] => [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      return await mongoose.connect(configService.get<string>('DB_HOST'));
    },
  },
];
