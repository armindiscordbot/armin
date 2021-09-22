import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from 'discord-nestjs';
import { BotController } from './bot.controller';
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
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
