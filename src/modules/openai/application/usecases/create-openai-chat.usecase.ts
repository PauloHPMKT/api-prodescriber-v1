import { Injectable } from '@nestjs/common';
import { OpenaiChatRequest } from '../../presentation/models/openai-chat-request';
import OpenAI from 'openai';
import { OpenaiInstance } from '../../presentation/models/openai-instance';

@Injectable()
export class CreateChatMessageUseCase {
  private openaiService: OpenAI;
  constructor(private readonly openaiInstance: OpenaiInstance) {
    this.openaiService = this.openaiInstance.createInstance();
  }

  async createChat(request: OpenaiChatRequest): Promise<OpenAI.ChatCompletion> {
    const response = await this.openaiService.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 2048,
      temperature: 0.8,
      messages: request.messages,
    });
    return response;
  }
}
