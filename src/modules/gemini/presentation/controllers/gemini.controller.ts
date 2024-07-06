import {
  Body,
  Controller,
  OnModuleInit,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { GenerateDto } from './dto/generate-dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('gemini')
export class GeminiController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'gemini-id',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'gemini-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    const requestPattern = ['gemini', 'getGeminiData', 'uploadGeminiData'];

    requestPattern.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Post('generate')
  generateData(@Body() data: GenerateDto) {
    console.log('BATEU AQUI NA API DO GEMINI');
    return this.client.send('gemini', data);
  }

  // @Post('upload')
  // @UseInterceptors(FilesInterceptor('images', 10))
  // async emitFile(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() prompt: any,
  // ) {
  //   console.log('AQUI E NO BACKEND', files, prompt);
  //   const message = {
  //     files: files.map((file) => ({
  //       originalname: file.originalname,
  //       mimetype: file.mimetype,
  //       buffer: file.buffer.toString('base64'), // Convertendo o buffer para string base64
  //     })),
  //     prompt: prompt.message,
  //   };
  //   return this.client.emit('uploadGeminiData', message);
  // }
  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 10))
  async manualUpload(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    try {
      return this.client.emit('uploadGeminiData', { files, body });
    } catch (error) {
      console.log(error, 'ERROR');
    }
  }

  // {
  //   storage: diskStorage({
  //     destination: './uploads',
  //     filename: (req, file, cb) => {
  //       const uniqueSuffix =
  //         Date.now() + '-' + Math.round(Math.random() * 1e9);
  //       const ext = extname(file.originalname);
  //       cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  //     },
  //   }),
  // }
  // async uploadData(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() data: any,
  // ) {
  //   const message = {
  //     prompt: data.message,
  //     files: files.map((file) => ({
  //       originalname: file.originalname,
  //       mimetype: file.mimetype,
  //       buffer: file.buffer.toString('base64'), // Convertendo o buffer para string base64
  //     })),
  //   };
  //   return this.client.send('uploadGeminiData', message);
  // }

  // @Post('upload')
  // uploadData(@Body() data: any) {
  //   console.log('AQUI È A PARTE DE UPLOAD DO GEMINI', data);
  //   //return this.client.send('gemini', data);
  // }

  @Post()
  generateDataFromKafka(@Body() data: GenerateDto) {
    console.log(data, 'AQUI E NO BACKEND');
    return 'test';
  }
}
