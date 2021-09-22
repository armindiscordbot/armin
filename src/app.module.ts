import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from 'discord-nestjs';
import { DiscordConfigService } from './environment/discord-config.service';
import { AppService } from './app.service';
import { StatisticsModule } from './statistics/statistics.module';
import { GuildModule } from './guild/guild.module';

@Module({
  imports: [
    DiscordModule.forRootAsync({ useClass: DiscordConfigService }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StatisticsModule,
    GuildModule,
  ],
  providers: [AppService, DiscordConfigService],
})
export class AppModule {}
