import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { Chat2Gateway } from './chat2.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, Chat2Gateway],
})
export class AppModule {}
