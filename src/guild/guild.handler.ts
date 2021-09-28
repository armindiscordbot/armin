import { Injectable } from '@nestjs/common';
import { On, Context } from 'discord-nestjs';
import { TextChannel, GuildMember, GuildChannel } from 'discord.js';

@Injectable()
export class GuildHandler {
  @On({ event: 'guildMemberAdd' })
  async guildMemberAdd(@Context() [context]: [GuildMember]): Promise<void> {
    const WELCOME_CHANNEL = process.env.WELCOME_CHANNEL;
    const { name } = context.guild;
    const { id } = context.user;
    const channel: GuildChannel = context.guild.channels.cache.find(
      (channel) => channel.id === WELCOME_CHANNEL,
    );

    if (channel.isText()) {
      (<TextChannel>channel).send(
        `Welcome <@${id}>, you just joined **${name}**!`,
      );
    }
  }
}
