import { Module } from '@nestjs/common';
import { GuildHandler } from './guild.handler';

@Module({
  providers: [GuildHandler],
  exports: [GuildHandler],
})
export class GuildModule {}
