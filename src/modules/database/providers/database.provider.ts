import { Provider } from '@nestjs/common';
import mongoose from 'mongoose';

export const makeDatabaseConnectionProviders = (): Provider[] => [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      return await mongoose.connect('mongodb://db:27017/prodescriber');
    },
  },
];
