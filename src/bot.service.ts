import { Injectable, Logger } from '@nestjs/common';
import {
  DiscordClientProvider,
  Once,
  OnCommand,
  On,
  Context,
} from 'discord-nestjs';
import {
  Message,
  MessageEmbed,
  GuildMember,
  GuildChannel,
  TextChannel,
} from 'discord.js';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(private readonly discordProvider: DiscordClientProvider) {}

  @Once({ event: 'ready' })
  onReady(): void {
    this.logger.log(
      `Logged in as ${this.discordProvider.getClient().user.tag}!`,
    );
  }

  // TODO: move into its own service
  @OnCommand({ name: 'stats' })
  async stats(@Context() [context]: [Message]): Promise<void> {
    const { name, memberCount, maximumMembers, channels } = context.guild;
    const membersPercentage = (memberCount * 100) / maximumMembers;
    const message = new MessageEmbed()
      .setColor('GREEN')
      .setTitle(`${name} stats`)
      .addField(
        'Members',
        `${memberCount} of ${maximumMembers} (${membersPercentage}%)`,
      )
      .addField('Channels', channels.cache.size)
      .setTimestamp();
    await context.reply(message);
  }

  // TODO: move into its own service
  @On({ event: 'guildMemberAdd' })
  async guildMemberAdd(@Context() [context]: [GuildMember]): Promise<void> {
    const WELCOME_CHANNEL_ID = '889220892381552661';
    const guild = context.guild;
    const { name } = guild;
    const user = context.user;
    const { id } = user;
    const channel: GuildChannel = guild.channels.cache.find(
      (channel) => channel.id === WELCOME_CHANNEL_ID,
    );
    if (channel.isText()) {
      (<TextChannel>channel).send(
        `Welcome <@${id}>, you just joined **${name}**!`,
      );
    }
  }
}
