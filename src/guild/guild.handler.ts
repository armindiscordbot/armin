import { Injectable } from '@nestjs/common';
import { On, Context } from 'discord-nestjs';
import { TextChannel, GuildMember, GuildChannel, Message } from 'discord.js';

@Injectable()
export class GuildHandler {
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

  @On({ event: 'message' })
  async onMessage(message: Message): Promise<void> {
    if (!message.author.bot) {
      // TODO: implement dabase persistency to store messages count
      await message.reply("I'm watching you");
    }
  }
}
