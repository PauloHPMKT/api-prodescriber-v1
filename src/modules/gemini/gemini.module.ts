import { Module } from '@nestjs/common';
import { GeminiController } from './presentation/controllers/gemini.controller';

@Module({
  imports: [],
  controllers: [GeminiController],
  providers: [],
  exports: [],
})
export class GeminiModule {}
