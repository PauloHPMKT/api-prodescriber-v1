import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiInstance {
  constructor(private readonly configService: ConfigService) {}
  createInstance(): OpenAI {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    return new OpenAI({ apiKey });
  }
}
