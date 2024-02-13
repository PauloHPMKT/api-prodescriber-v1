import OpenAI from 'openai';

export interface OpenaiChatResponse {
  success: boolean;
  result: OpenAI.ChatCompletion.Choice;
}
