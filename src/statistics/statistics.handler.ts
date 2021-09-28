import { Injectable } from '@nestjs/common';
import { OnCommand, Context } from 'discord-nestjs';
import { Message, MessageEmbed } from 'discord.js';

import { Colors, isMessageInGuild } from 'src/utils';

@Injectable()
export class StatisticsHandler {
  @OnCommand({ name: 'statistics' })
  async stats(@Context() [message]: [Message]): Promise<void> {
    if (isMessageInGuild(message)) {
      const { name, memberCount, maximumMembers, channels } = message?.guild;
      const membersPercentage = (memberCount * 100) / maximumMembers;
      const replyMessage = new MessageEmbed()
        .setColor(Colors.GREEN)
        .setTitle(`${name} statistics`)
        .addField(
          'Members',
          `${memberCount} of ${maximumMembers} (${membersPercentage}%)`,
        )
        .addField('Channels', channels.cache.size)
        .setTimestamp();
      await message.reply(replyMessage);
    }
  }
}
