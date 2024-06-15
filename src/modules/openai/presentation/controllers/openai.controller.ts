import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpenaiChatRequest } from '../models/openai-chat-request';
import { OpenaiChatResponse } from '../models/openai-chat-response';
import OpenAI from 'openai';
import { CreateChatMessageUseCase } from '../../application/usecases/create-openai-chat.usecase';
import { CreateOpenaiChatResponseUseCase } from '../../application/usecases/create-openai-response.usecase';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';

@Controller('openai')
export class OpenaiController {
  constructor(
    private readonly createChatMessageUseCase: CreateChatMessageUseCase,
    private readonly createOpenaiChatResponseUseCase: CreateOpenaiChatResponseUseCase,
  ) {}

  @Post('chat')
  @IsPublic()
  async getChatOpenai(
    @Body() message: OpenaiChatRequest,
  ): Promise<OpenaiChatResponse> {
    const getMessages = (await this.createChatMessageUseCase.createChat(
      message,
    )) as OpenAI.ChatCompletion;
    return await this.createOpenaiChatResponseUseCase.getChatOpenaiResponse(
      getMessages,
    );
  }

  @Get()
  getHello(): string {
    console.log('Hello from OpenAI');
    return 'Hello from OpenAI';
  }
}
