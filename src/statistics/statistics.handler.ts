import { Injectable } from '@nestjs/common';
import { OnCommand, Context } from 'discord-nestjs';
import { Message, MessageEmbed } from 'discord.js';

@Injectable()
export class StatisticsHandler {
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
}
