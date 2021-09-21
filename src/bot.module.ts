import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from 'discord-nestjs';
import { BotService } from './bot.service';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: process.env.DISCORD_TOKEN,
        commandPrefix: '!',
      }),
    }),
    ConfigModule.forRoot(),
  ],
  providers: [BotService],
})
export class BotModule {}
