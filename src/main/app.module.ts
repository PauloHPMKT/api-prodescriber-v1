import { diskStorage } from 'multer';
import { ConfigModule } from '@nestjs/config';
import { Module, Provider } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../modules/users/presentation/user.module';
import { AuthModule } from '../modules/auth/auth.module';
import { makeAppGuardProvider } from '../infra/providers/app-guard.provider';
import { OpenaiModule } from '../modules/openai/presentation/openai.module';
import { GeminiModule } from '../modules/gemini/gemini.module';
import { FileUploadModule } from '../modules/fileUpload/fileUpload.module';
import { FileUtils } from '../modules/fileUpload/files.utils';

const providers: Provider[] = [...makeAppGuardProvider(), AppService];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      imports: [FileUploadModule],
      useFactory: (fileUtils: FileUtils) => ({
        fileFilter: fileUtils.validateImageFile,
        storage: diskStorage({
          destination: 'uploads',
          filename: fileUtils.editFileName,
        }),
      }),
      inject: [FileUtils],
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
