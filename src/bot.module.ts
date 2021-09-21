import { Module } from '@nestjs/common';
import { DiscordModule } from 'discord-nestjs';
import { BotService } from './bot.service';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: 'ODg5MTk1OTA2MjI0Nzc1MTY4.YUduOA.ipCanMSwbt5DdxJlzIApGq1ZLlI',
        commandPrefix: '!',
      }),
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
