import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { UserSchema } from '../schemas/user.schema';

export const makeUserCollectionProviders = (): Provider[] => [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => {
      return connection.model('User', UserSchema);
    },
    inject: ['DATABASE_CONNECTION'],
  },
];
