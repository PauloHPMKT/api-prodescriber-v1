import OpenAI from 'openai';
import { OpenaiChatResponse } from '../../presentation/models/openai-chat-response';

export class CreateOpenaiChatResponseUseCase {
  async getChatOpenaiResponse(
    message: OpenAI.ChatCompletion,
  ): Promise<OpenaiChatResponse> {
    const result = message?.choices?.length && message?.choices[0];
    const response = {
      success: !!result,
      result,
    };
    console.log(response);
    return response;
  }
}
