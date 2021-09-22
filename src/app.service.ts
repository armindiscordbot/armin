import { Injectable, Logger } from '@nestjs/common';
import { DiscordClientProvider, Once } from 'discord-nestjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly discordProvider: DiscordClientProvider) {}

  @Once({ event: 'ready' })
  onReady(): void {
    this.logger.log(
      `Logged in as ${this.discordProvider.getClient().user.tag}!`,
    );
  }
}
