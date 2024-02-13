import OpenAI from 'openai';

export interface OpenaiChatRequest {
  messages: OpenAI.Chat.ChatCompletionMessage[];
}
