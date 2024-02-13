import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { CreateChatMessageUseCase } from '../../application/usecases/create-openai-chat.usecase';
import { CreateOpenaiChatResponseUseCase } from '../../application/usecases/create-openai-response.usecase';
import { OpenaiInstance } from '../models/openai-instance';

@Module({
  imports: [],
  controllers: [OpenaiController],
  providers: [
    CreateChatMessageUseCase,
    CreateOpenaiChatResponseUseCase,
    OpenaiInstance,
  ],
  exports: [],
})
export class OpenaiModule {}
